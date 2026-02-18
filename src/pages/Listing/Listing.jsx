import ListingTable from "./ListingTable";

function Listing() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">245</p>
                    <p className="text-xl font-semibold">Total Orders</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">198</p>
                    <p className="text-xl font-semibold">Completed</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">47</p>
                    <p className="text-xl font-semibold">Cancelled</p>
                </div>
            </div>
            <div className="mt-5">
                <ListingTable />
            </div>
        </div>
    );
}

export default Listing;
