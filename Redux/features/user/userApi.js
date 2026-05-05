import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (params) => ({
                url: "users",
                method: "GET",
                params,
            }),
            providesTags: ["user"],
        }),
        deleteUser: builder.mutation({
            query: (_id) => ({
                url: `users/delete-user/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation,
} = userApi;

export default userApi;