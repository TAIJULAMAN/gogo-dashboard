import EarningsTable from "./EarningsTable";

function Earnings() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 whitespace-nowrap bg-[#F2F2F2] rounded-xl overflow-hidden">
        <div className="relative flex flex-col justify-center items-center p-6 gap-1 border-b md:border-b-0 md:border-r border-gray-300">
          <p className="text-[#2D8C3C] text-2xl font-bold">200K</p>
          <p className="text-xl font-semibold">Total Revenue</p>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#2D8C3C]" />
        </div>
        <div className="relative flex flex-col justify-center items-center p-6 gap-1 border-b md:border-b-0 md:border-r border-gray-300">
          <p className="text-[#2D8C3C] text-2xl font-bold">1200</p>
          <p className="text-xl font-semibold">This Month</p>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#2D8C3C]" />
        </div>
        <div className="relative flex flex-col justify-center items-center p-6 gap-1">
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
