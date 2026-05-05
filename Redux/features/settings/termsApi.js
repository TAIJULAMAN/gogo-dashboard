import { baseApi } from "../baseApi";

const termsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTerms: builder.query({
            query: () => ({
                url: "terms-conditions",
                method: "GET",
            }),
            providesTags: ["terms"],
        }),

        updateTerms: builder.mutation({
            query: ({ description }) => ({
                url: "terms-conditions",
                method: "POST",
                body: { description },
            }),
            invalidatesTags: ["terms"],
        }),
    }),
});

export const { useGetTermsQuery, useUpdateTermsMutation } = termsApi;
