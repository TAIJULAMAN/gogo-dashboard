import { baseApi } from "../baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "users/my-profile",
            providesTags: ["profile"],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "users/update",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
} = profileApi;
