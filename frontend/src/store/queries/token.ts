import { api } from './index'

export const tokenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation<{ success: boolean; token: string }, void>({
      query: () => ({
        url: '/token',
        method: 'POST',
      }),
      invalidatesTags: ['Token'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetTokenMutation } = tokenApi
