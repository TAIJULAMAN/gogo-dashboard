import { baseApi } from "../baseApi";

const deliverySettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDeliverySettings: builder.mutation({
      query: (content) => ({
        url: "common/delivery-settings",
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: ["deliverySettings"],
    }),
  }),
});

export const { useUpdateDeliverySettingsMutation } = deliverySettingsApi;
