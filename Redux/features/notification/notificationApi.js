import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: (params) => ({
                url: "notifications/all-notifications",
                method: "GET",
                params,
            }),
            providesTags: ["notification"],
        }),
        updateSingleNotification: builder.mutation({
            query: (id) => ({
                url: `notifications/mark-as-read/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["notification"],
        }),
        updateAllNotification: builder.mutation({
            query: () => ({
                url: "notifications/mark-all-as-read",
                method: "PATCH",
            }),
            invalidatesTags: ["notification"],
        }),
    }),
});

export const { useGetAllNotificationQuery, useUpdateSingleNotificationMutation, useUpdateAllNotificationMutation } =
    notificationApi;

export default notificationApi;