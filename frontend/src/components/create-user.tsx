import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Header } from './header/header'
import { useGetTokenMutation } from '../store/queries/token'
import { SerializedError } from '@reduxjs/toolkit'
import { ErrorType } from '../store/queries'
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material'
import { useGetPositionsQuery } from '../store/queries/position'
import { useCreateUserMutation } from '../store/queries/users'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const CreateUser = (): React.ReactElement => {
  const [getToken] = useGetTokenMutation()
  const [errorResponse, setErrorResponse] = useState<any>()
  const { data: positionsResponse, isLoading } = useGetPositionsQuery()
  const [createUser] = useCreateUserMutation()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      photo: {},
    },
  })

  const onGetToken = async () => {
    const response:
      | {
          data: {
            success: boolean
            token: string
          }
        }
      | {
          error: ErrorType | SerializedError
        } = await getToken()

    if ('error' in response) {
      setErrorResponse(response.error)
      setErrorOpen(true)
      return
    }
    localStorage.setItem('token', response.data.token)
  }

  const onSubmit = async (data: any) => {
    const file = await data.photo[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const response = await createUser({ ...data, photo: reader.result })
      if ('error' in response) {
        setErrorResponse(response.error)
        setErrorOpen(true)
        return
      }
      return response
    }
  }

  const [errorOpen, setErrorOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorOpen(false)
  }

  if (isLoading) return <>Loading</>

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <Button variant="outlined" onClick={onGetToken}>
            Get Token
          </Button>
        </div>
        <Divider orientation="vertical" flexItem />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...register('name', { required: true })}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...register('email', { required: true })}
            sx={{ marginTop: '1rem' }}
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            {...register('phone', { required: true })}
            sx={{ marginTop: '1rem' }}
          />
          <FormControl fullWidth sx={{ marginTop: '1rem' }}>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select label="Position" {...register('position', { required: true })}>
              {positionsResponse.positions.map((position: any) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" component="label" sx={{ marginTop: '1rem' }}>
            Choose Photo
            <input
              accept="image/jpg, image/jpeg"
              type="file"
              hidden
              {...register('photo', { required: true })}
            />
          </Button>
          <Button variant="contained" sx={{ marginTop: '1rem' }} type="submit">
            Create User
          </Button>
        </form>
      </Container>
      {errorResponse && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errorResponse.status} {errorResponse.data.message}
              <br />
              {errorResponse.data.fails}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}
