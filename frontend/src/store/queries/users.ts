import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation<any, string>({
      query: (params) => {
        return {
          url: `/users${params}`,
        }
      },
      invalidatesTags: ['User'],
    }),
    getUserById: builder.mutation<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      invalidatesTags: ['User'],
    }),
    createUser: builder.mutation<void, any>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchPhoto: builder.mutation<void, any>({
      query: (body) => {
        return {
          url: '/photo',
          method: 'PATCH',
          data: body,
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersMutation,
  useGetUserByIdMutation,
  useCreateUserMutation,
  usePatchPhotoMutation,
} = userApi
