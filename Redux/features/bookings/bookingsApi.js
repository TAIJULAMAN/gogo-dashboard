import { baseApi } from "../baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (params) => ({
        url: "statistics/admin-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["bookings"],
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingsApi;

export default bookingsApi;
