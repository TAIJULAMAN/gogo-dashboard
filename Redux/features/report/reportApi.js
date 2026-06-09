import { baseApi } from "../baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (params) => ({
        url: "reports",
        method: "GET",
        params,
      }),
      providesTags: ["reports"],
    }),
    resolveReport: builder.mutation({
      query: (id) => ({
        url: `reports/${id}/resolve`,
        method: "PATCH",
      }),
      invalidatesTags: ["reports"],
    }),
  }),
});

export const { useGetReportsQuery, useResolveReportMutation } = reportApi;
