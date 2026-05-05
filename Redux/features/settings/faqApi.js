import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaq: builder.query({
            query: (params) => ({
                url: "faqs",
                method: "GET",
                params,
            }),
            providesTags: ["faq"],
        }),
        createFaq: builder.mutation({
            query: ({ answer, question }) => ({
                url: "faqs",
                method: "POST",
                body: { answer, question },
            }),
            invalidatesTags: ["faq"],
        }),
        updateFaq: builder.mutation({
            query: ({ _id, answer, question }) => ({
                url: `faqs/${_id}`,
                method: "PATCH",
                body: { answer, question },
            }),
            invalidatesTags: ["faq"],
        }),
        deleteFaq: builder.mutation({
            query: (_id) => ({
                url: `faqs/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["faq"],
        }),
    }),
});

export const {
    useGetAllFaqQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqApi;

export default faqApi;