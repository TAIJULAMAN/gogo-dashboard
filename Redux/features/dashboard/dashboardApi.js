import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: (params) => ({
        url: "statistics/overview",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = dashboardApi;

export default dashboardApi;
