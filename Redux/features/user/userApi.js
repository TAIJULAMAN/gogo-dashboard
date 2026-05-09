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
        blockUser: builder.mutation({
            query: ({ userId, data }) => ({
                url: `users/${userId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        getAllRider: builder.query({
            query: (params) => ({
                url: "users/riders",
                method: "GET",
                params,
            }),
            providesTags: ["user"],
        }),
        blockRider: builder.mutation({
            query: ({ riderId, data }) => ({
                url: `users/${riderId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        approveRider: builder.mutation({
            query: ({ riderId, data }) => ({
                url: `users/${riderId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useBlockUserMutation,
    useGetAllRiderQuery,
    useBlockRiderMutation,
    useApproveRiderMutation
} = userApi;

export default userApi;