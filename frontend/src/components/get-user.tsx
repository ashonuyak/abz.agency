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
import { useGetUserByIdMutation } from '../store/queries/users'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const GetUserById = (): React.ReactElement => {
  const [userResponse, setUserResponse] = useState<any>()
  const [errorResponse, setErrorResponse] = useState<any>()
  const [getUserById] = useGetUserByIdMutation()

  const handleGetUser = async (data: any) => {
    const userResponse:
      | { data: any }
      | {
          error: ErrorType | SerializedError
        } = await getUserById(data.id)

    if ('error' in userResponse) {
      setErrorResponse(userResponse.error)
      setErrorOpen(true)
      setUserResponse(null)
      return
    }
    setUserResponse(userResponse.data.user)
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: '',
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
          onSubmit={handleSubmit(handleGetUser)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField id="outlined-basic" label="ID" variant="outlined" {...register('id')} />
          <Button variant="outlined" type="submit" sx={{ marginTop: '1rem' }}>
            Get User
          </Button>
        </form>
        <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
        {userResponse ? (
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
                  <TableRow
                    key={userResponse.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img src={userResponse.photo} style={{ borderRadius: '50%' }} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userResponse.id}
                    </TableCell>
                    <TableCell align="right">{userResponse.name}</TableCell>
                    <TableCell align="right">{userResponse.email}</TableCell>
                    <TableCell align="right">{userResponse.phone}</TableCell>
                    <TableCell align="right">
                      {userResponse.position_id + ' ' + userResponse.position}
                    </TableCell>
                    <TableCell align="right">{userResponse.registration_timestamp}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
