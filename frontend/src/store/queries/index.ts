// import { ENV } from '@common/enums/enums';
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'

export type ErrorType = {
  data: {
    message: string
  }
  status: number
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://abz-agency-test-app-server.herokuapp.com',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ErrorType>

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User', 'Token', 'Position'],
  endpoints: () => ({}),
})
