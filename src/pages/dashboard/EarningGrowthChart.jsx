import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useGetEarningsGrowthQuery } from "../../../Redux/features/dashboard/dashboardApi";

const defaultData = [
  { month: "Jan", earnings: 0 },
  { month: "Feb", earnings: 0 },
  { month: "Mar", earnings: 0 },
  { month: "Apr", earnings: 0 },
  { month: "May", earnings: 0 },
  { month: "Jun", earnings: 0 },
  { month: "Jul", earnings: 0 },
  { month: "Aug", earnings: 0 },
  { month: "Sep", earnings: 0 },
  { month: "Oct", earnings: 0 },
  { month: "Nov", earnings: 0 },
  { month: "Dec", earnings: 0 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, earnings } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg border border-gray-100 text-sm">
        <p className="font-semibold text-gray-700">{month}</p>
        <p className="text-[#2D8C3C] font-bold">AED {earnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
};

const EarningGrowthChart = ({ year }) => {
  const { data, isLoading } = useGetEarningsGrowthQuery({ year });

  const chartData = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return defaultData;

    const monthlyAmounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    data.data.forEach((item) => {
      if (!item.date) return;
      const dateParts = item.date.split("-");
      if (dateParts.length < 2) return;
      const monthIndex = parseInt(dateParts[1], 10) - 1;
      const monthName = months[monthIndex];
      if (monthName) {
        monthlyAmounts[monthName] = (monthlyAmounts[monthName] || 0) + (item.amount || 0);
      }
    });

    return defaultData.map((d) => ({
      ...d,
      earnings: monthlyAmounts[d.month] !== undefined ? monthlyAmounts[d.month] : 0,
    }));
  }, [data]);

  const maxVal = useMemo(() => {
    if (!chartData || chartData.length === 0) return 100;
    return Math.max(...chartData.map((item) => item.earnings), 10);
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={isLoading ? defaultData : chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2D8C3C" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2D8C3C" stopOpacity={0} />
          </linearGradient>
        </defs>
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
          domain={[0, maxVal + 10]}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          tickFormatter={(v) => `AED ${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#2D8C3C", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          dataKey="earnings"
          stroke="#2D8C3C"
          strokeWidth={2.5}
          fill="url(#earningsGradient)"
          dot={{ r: 3, fill: "#2D8C3C", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#2D8C3C" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EarningGrowthChart;
