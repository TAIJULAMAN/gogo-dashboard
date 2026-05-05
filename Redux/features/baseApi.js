import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      let token = state?.auth?.token;

      if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("accessToken");
      }
      if (!token && typeof window !== "undefined") {
        const resetToken = localStorage.getItem("resetToken");
        if (resetToken) {
          token = resetToken;
        }
      }

      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "profile",
    "notification",
    "privacy",
    "terms",
    "about",
    "faq",
    "user",
    "admin",
    "earnings",
    "bookings",
    "vehicle",
    "blog",
    "content",
    "review",
    "newsletter",
  ],
});
