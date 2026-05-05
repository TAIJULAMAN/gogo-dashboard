import { baseApi } from "../baseApi";

const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: "settings/about",
        method: "GET",
      }),
      providesTags: ["about"],
    }),

    updateAboutUs: builder.mutation({
      query: ({ description }) => ({
        url: "settings/about",
        method: "POST",
        body: { description },
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi;
