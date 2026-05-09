import { useGetDashboardOverviewQuery } from "../../../Redux/features/dashboard/dashboardApi";
import { LuUsers } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import { MdList, MdOutlineInventory2 } from "react-icons/md";

const DashboardStats = () => {
  const { data, isLoading } = useGetDashboardOverviewQuery();
  const dashboardData = data?.data || {};

  const stats = [
    {
      label: "Total User",
      value: isLoading ? "..." : dashboardData.totalUsers || 0,
      icon: LuUsers,
      color: "text-[#2D8C3C]",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      label: "Total Riders",
      value: isLoading ? "..." : dashboardData.totalRiders || 0,
      icon: FaMotorcycle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      label: "Total Orders",
      value: isLoading ? "..." : dashboardData.totalOrders || 0,
      icon: MdList,
      color: "text-blue-600",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      label: "Total Earnings",
      value: isLoading ? "..." : `AED ${dashboardData.totalEarning?.toFixed(2) || 0}`,
      icon: MdOutlineInventory2,
      color: "text-orange-600",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex items-center p-6 ${stat.bg} rounded-2xl gap-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300 border border-transparent hover:border-white/50`}
        >
          <div className={`p-4 ${stat.iconBg} rounded-xl`}>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <p className={`text-2xl font-bold ${stat.color} leading-none mb-1`}>
              {stat.value}
            </p>
            <p className="text-sm font-medium text-gray-500 whitespace-nowrap">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
