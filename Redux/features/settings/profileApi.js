import { baseApi } from "../baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "users/me",
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "users/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
