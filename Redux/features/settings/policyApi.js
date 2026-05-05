import { baseApi } from "../baseApi";

const policyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPolicy: builder.query({
            query: () => ({
                url: "policy",
                method: "GET",
            }),
            providesTags: ["privacy"],
        }),

        updatePolicy: builder.mutation({
            query: ({ description }) => ({
                url: "policy",
                method: "PATCH",
                body: { description },
            }),
            invalidatesTags: ["privacy"],
        }),
    }),
});

export const { useGetPolicyQuery, useUpdatePolicyMutation } = policyApi;
