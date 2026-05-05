import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (params) => ({
        url: "notifications",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    updateSingleNotification: builder.mutation({
      query: (notificationId) => ({
        url: `notifications/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    updateAllNotification: builder.mutation({
      query: () => ({
        url: "notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useUpdateSingleNotificationMutation,
  useUpdateAllNotificationMutation,
} = notificationApi;

export default notificationApi;
