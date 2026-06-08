import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useGetRiderGrowthQuery } from "../../../Redux/features/dashboard/dashboardApi";

const defaultData = [
  { month: "Jan", riders: 0 },
  { month: "Feb", riders: 0 },
  { month: "Mar", riders: 0 },
  { month: "Apr", riders: 0 },
  { month: "May", riders: 0 },
  { month: "Jun", riders: 0 },
  { month: "Jul", riders: 0 },
  { month: "Aug", riders: 0 },
  { month: "Sep", riders: 0 },
  { month: "Oct", riders: 0 },
  { month: "Nov", riders: 0 },
  { month: "Dec", riders: 0 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, riders } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg border border-gray-100 text-sm">
        <p className="font-semibold text-gray-700">{month}</p>
        <p className="text-[#2D8C3C] font-bold">Riders: {riders}</p>
      </div>
    );
  }
  return null;
};

const RiderGrowthChart = ({ year }) => {
  const { data, isLoading } = useGetRiderGrowthQuery({ year });

  const chartData = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return defaultData;

    const monthlyCounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    data.data.forEach((item) => {
      if (!item.date) return;
      const dateParts = item.date.split("-");
      if (dateParts.length < 2) return;
      const monthIndex = parseInt(dateParts[1], 10) - 1;
      const monthName = months[monthIndex];
      if (monthName) {
        monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + (item.count || 0);
      }
    });

    return defaultData.map((d) => ({
      ...d,
      riders: monthlyCounts[d.month] !== undefined ? monthlyCounts[d.month] : 0,
    }));
  }, [data]);

  const maxVal = useMemo(() => {
    if (!chartData || chartData.length === 0) return 100;
    return Math.max(...chartData.map((item) => item.riders), 10);
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart 
        data={isLoading ? defaultData : chartData} 
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, maxVal + 5]}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45,140,60,0.05)" }} />
        <Bar dataKey="riders" fill="#2D8C3C" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiderGrowthChart;
