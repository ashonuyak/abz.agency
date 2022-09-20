import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GetUsers } from '../components/get-users'
import { CreateUser } from '../components/create-user'
import { GetUserById } from '../components/get-user'

const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<CreateUser />} />
        <Route path="get-users" element={<GetUsers />} />
        <Route path="get-user-by-id" element={<GetUserById />} />
      </Routes>
    </BrowserRouter>
  )
}

export { Routing }
