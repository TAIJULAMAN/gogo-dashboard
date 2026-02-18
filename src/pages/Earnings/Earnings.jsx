import EarningsTable from "./EarningsTable";

function Earnings() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">200K</p>
          <p className="text-xl font-semibold">Total Revenue</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">1200</p>
          <p className="text-xl font-semibold">This Month</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">1200</p>
          <p className="text-xl font-semibold">Today</p>
        </div>
      </div>
      <div className="mt-5">
        <EarningsTable />
      </div>
    </div>
  );
}

export default Earnings;
