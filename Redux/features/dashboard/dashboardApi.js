import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: () => ({
        url: "dashboard/overview",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getUserGrowth: builder.query({
      query: (params) => ({
        url: "dashboard/user-growth",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    getRiderGrowth: builder.query({
      query: (params) => ({
        url: "dashboard/rider-growth",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    getEarningsGrowth: builder.query({
      query: (params) => ({
        url: "dashboard/revenue-trend",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery, useGetUserGrowthQuery, useGetRiderGrowthQuery, useGetEarningsGrowthQuery } = dashboardApi;

export default dashboardApi;
