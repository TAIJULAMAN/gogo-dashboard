import { baseApi } from "../baseApi";

const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => ({
                url: "orders",
                method: "GET",
                params,
            }),
            providesTags: ["order"],
        }),
        getAllOrdersStats: builder.query({
            query: (params) => ({
                url: "orders/summary",
                method: "GET",
                params,
            }),
            providesTags: ["order"],
        })
    }),
});

export const {
    useGetAllOrdersQuery,
    useGetAllOrdersStatsQuery
} = orderManagementApi;

export default orderManagementApi;
