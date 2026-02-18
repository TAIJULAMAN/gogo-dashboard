import TransactionsTable from "./TransactionsTable";

function Transactions() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">$45.2K</p>
                    <p className="text-xl font-semibold">Total Revenue</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">234</p>
                    <p className="text-xl font-semibold">Completed</p>
                </div>
                <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
                    <p className="text-[#2D8C3C] text-2xl font-bold">12</p>
                    <p className="text-xl font-semibold">Cancelled</p>
                </div>
            </div>
            <div className="mt-5">
                <TransactionsTable />
            </div>
        </div>
    );
}

export default Transactions;
