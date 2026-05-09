import ListingTable from "./ListingTable";
import { useGetAllOrdersStatsQuery } from "../../../Redux/features/orderManagement/orderManagementApi";

function Listing() {
    const { data } = useGetAllOrdersStatsQuery();
    console.log(data)
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">{data?.data?.totalOrders}</p>
                    <p className="text-xl font-semibold">Total Orders</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">{data?.data?.completedOrders}</p>
                    <p className="text-xl font-semibold">Completed</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">{data?.data?.pendingOrders}</p>
                    <p className="text-xl font-semibold">Pending</p>
                </div>
            </div>
            <div className="mt-5">
                <ListingTable />
            </div>
        </div>
    );
}

export default Listing;
