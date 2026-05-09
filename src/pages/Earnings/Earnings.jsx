import { useGetDashboardOverviewQuery } from "../../../Redux/features/dashboard/dashboardApi";
import EarningsTable from "./EarningsTable";

function Earnings() {
  const { data: earningsData } = useGetDashboardOverviewQuery();
  console.log(earningsData);
  const totalRevenue = earningsData?.data?.totalRevenue;
  const totalEarning = earningsData?.data?.thisMonthRevenue;
  const todayRevenue = earningsData?.data?.todayRevenue;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">
            {totalRevenue || 0} AED
          </p>
          <p className="text-xl font-semibold">Total Revenue</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">
            {totalEarning || 0} AED
          </p>
          <p className="text-xl font-semibold">This Month</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">
            {todayRevenue || 0} AED
          </p>
          <p className="text-xl font-semibold">Today</p>
        </div>
      </div>
      <div className="mt-8">
        <EarningsTable />
      </div>
    </div>
  );
}

export default Earnings;
