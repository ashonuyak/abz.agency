import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<any, void>({
      query: () => '/positions',
      providesTags: ['Position'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPositionsQuery } = userApi
