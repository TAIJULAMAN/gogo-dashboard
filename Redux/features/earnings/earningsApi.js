import { baseApi } from "../baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminEarnings: builder.query({
      query: (params) => ({
        url: "dashboard/earnings",
        method: "GET",
        params,
      }),
      providesTags: ["earnings"],
    }),
  }),
});

export const { useGetAdminEarningsQuery } = earningsApi;

export default earningsApi;
