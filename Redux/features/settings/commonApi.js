import { baseApi } from "../baseApi";

const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommon: builder.query({
      query: () => ({
        url: "common",
        method: "GET",
      }),
      providesTags: ["common"],
    }),

    updateCommon: builder.mutation({
      query: (content) => ({
        url: "common/content",
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: ["common"],
    }),
  }),
});

export const { useGetCommonQuery, useUpdateCommonMutation } = commonApi;
