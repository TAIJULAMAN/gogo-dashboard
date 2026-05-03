import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const earningData = [
  { month: "Jan", earnings: 4200 },
  { month: "Feb", earnings: 5800 },
  { month: "Mar", earnings: 5100 },
  { month: "Apr", earnings: 7400 },
  { month: "May", earnings: 8900 },
  { month: "Jun", earnings: 8100 },
  { month: "Jul", earnings: 10200 },
  { month: "Aug", earnings: 11500 },
  { month: "Sep", earnings: 10800 },
  { month: "Oct", earnings: 13000 },
  { month: "Nov", earnings: 14500 },
  { month: "Dec", earnings: 16800 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, earnings } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg border border-gray-100 text-sm">
        <p className="font-semibold text-gray-700">{month}</p>
        <p className="text-[#1d6fa8] font-bold">${earnings.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const EarningGrowthChart = () => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart
      data={earningData}
      margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
    >
      <defs>
        <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1d6fa8" stopOpacity={0.25} />
          <stop offset="95%" stopColor="#1d6fa8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: "#6b7280" }}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tick={{ fontSize: 12, fill: "#6b7280" }}
        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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

export default EarningGrowthChart;
