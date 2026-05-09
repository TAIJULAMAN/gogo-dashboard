import { baseApi } from "../baseApi";

const hotAreaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHotAreas: builder.query({
            query: (params) => ({
                url: "dashboard/hot-areas",
                method: "GET",
                params,
            }),
            providesTags: ["hotArea"],
        }),
    }),
});

export const {
    useGetHotAreasQuery,
} = hotAreaApi;

export default hotAreaApi;
