import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Header } from './header/header'
import { SerializedError } from '@reduxjs/toolkit'
import { ErrorType } from '../store/queries'
import {
  Divider,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Alert,
  Snackbar,
  Stack,
} from '@mui/material'
import { useGetUsersMutation } from '../store/queries/users'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

export const GetUsers = (): React.ReactElement => {
  const [usersResponse, setUsersResponse] = useState<any>()
  const [errorResponse, setErrorResponse] = useState<any>()
  const [getUsers] = useGetUsersMutation()

  const handleGetUsers = async (data: any) => {
    const params = Object.keys(data).length
      ? (
          '?' +
          Object.keys(data).map((key) => {
            return data[key] ? `${key.toString()}=${data[key].toString()}&` : ''
          })
        )
          .replace(/[,]/g, '')
          .slice(0, -1)
      : ''

    const usersResponse:
      | { data: any }
      | {
          error: ErrorType | SerializedError
        } = await getUsers(params)
    if ('error' in usersResponse) {
      setErrorResponse(usersResponse.error)
      setErrorOpen(true)
      return
    }
    setUsersResponse(usersResponse.data)
  }

  const handlePrevPage = async () => {
    const users = await axios.get(usersResponse.links.prev_url)
    if ('error' in users) {
      return
    }
    setUsersResponse(users.data)
  }

  const handleNextPage = async () => {
    const users = await axios.get(usersResponse.links.next_url)
    if ('error' in users) {
      return
    }
    setUsersResponse(users.data)
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      page: '',
      count: '',
      offset: '',
    },
  })

  const [errorOpen, setErrorOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorOpen(false)
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-around' }}>
        <form
          onSubmit={handleSubmit(handleGetUsers)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField id="outlined-basic" label="Page" variant="outlined" {...register('page')} />
          <TextField
            id="outlined-basic"
            label="Count"
            variant="outlined"
            {...register('count')}
            sx={{ marginTop: '1rem' }}
          />
          <TextField
            id="outlined-basic"
            label="Offset"
            variant="outlined"
            {...register('offset')}
            sx={{ marginTop: '1rem' }}
          />
          <Button variant="outlined" type="submit" sx={{ marginTop: '1rem' }}>
            Get Users
          </Button>
        </form>
        <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
        {usersResponse ? (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Position</TableCell>
                    <TableCell align="right">Registration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersResponse.users.map((user: any) => (
                    <TableRow
                      key={user.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <img src={user.photo} style={{ borderRadius: '50%' }} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.phone}</TableCell>
                      <TableCell align="right">{user.position_id + ' ' + user.position}</TableCell>
                      <TableCell align="right">{user.registration_timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                onClick={handlePrevPage}
                type="submit"
                disabled={!usersResponse.links.prev_url}
              >
                Prev Page
              </Button>
              <Chip label={usersResponse.page} variant="outlined" sx={{ margin: '0 2rem' }} />
              <Button
                variant="outlined"
                onClick={handleNextPage}
                type="submit"
                disabled={!usersResponse.links.next_url}
              >
                Next Page
              </Button>
            </div>
          </div>
        ) : (
          <Chip label="No Users Selected" variant="outlined" />
        )}
      </Container>
      {errorResponse && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errorResponse.status} {errorResponse.data.message}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}
