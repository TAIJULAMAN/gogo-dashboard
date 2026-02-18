import TransactionsTable from "./TransactionsTable";

function Transactions() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 whitespace-nowrap h-[100px] rounded-xl">
                <div className="relative flex flex-col justify-center items-center p-3 bg-[#F2F2F2] gap-1">
                    <p className="text-[#2D8C3C] text-2xl font-bold mr-10">$45.2K</p>
                    <p className="text-xl font-semibold">Total Revenue</p>
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#2D8C3C]" />
                </div>
                <div className="relative flex flex-col justify-center items-center p-3 bg-[#F2F2F2] gap-1">
                    <p className="text-[#2D8C3C] text-2xl font-bold mr-10">234</p>
                    <p className="text-xl font-semibold">Completed</p>
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#2D8C3C]" />
                </div>
                <div className="relative flex flex-col justify-center items-center p-3 bg-[#F2F2F2] gap-1">
                    <p className="text-[#2D8C3C] text-2xl font-bold">12</p>
                    <p className="text-xl font-semibold">Pending</p>
                </div>
            </div>
            <div className="mt-5">
                <TransactionsTable />
            </div>
        </div>
    );
}

export default Transactions;
