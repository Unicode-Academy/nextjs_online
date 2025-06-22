import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type User = {
  id?: number;
  name: string;
  email: string;
};
const USER_TAG = "Users" as const;
export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: [USER_TAG],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => {
    return {
      getUsers: builder.query<User[], void>({
        query: () => "/users",
        providesTags: (result) => {
          return result
            ? [
                ...result.map(({ id }) => ({ type: USER_TAG, id })),
                { type: USER_TAG, id: "LIST" },
              ]
            : [{ type: USER_TAG, id: "LIST" }];
        },
      }),
      getUser: builder.query<User, number>({
        query: (id: number) => `/users/${id}`,
        providesTags: (result, error, id) => [{ type: USER_TAG, id }],
      }),
      addUser: builder.mutation({
        query: (user: User) => ({
          url: "/users",
          method: "POST",
          body: user,
        }),
        invalidatesTags: [{ type: USER_TAG, id: "LIST" }],
      }),

      updateUser: builder.mutation({
        query: (user: User) => {
          const { id, ...body } = user;
          return {
            url: `/users/${id}`,
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: (result, error, { id }) => [{ type: USER_TAG, id }],
      }),

      deleteUser: builder.mutation({
        query: (id: number) => {
          return {
            url: `/users/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, id) => [{ type: USER_TAG, id }],
      }),
    };
  },
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
