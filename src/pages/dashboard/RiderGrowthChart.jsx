import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const riderData = [
  { month: "Jan", riders: 120 },
  { month: "Feb", riders: 145 },
  { month: "Mar", riders: 130 },
  { month: "Apr", riders: 180 },
  { month: "May", riders: 210 },
  { month: "Jun", riders: 195 },
  { month: "Jul", riders: 240 },
  { month: "Aug", riders: 275 },
  { month: "Sep", riders: 260 },
  { month: "Oct", riders: 300 },
  { month: "Nov", riders: 330 },
  { month: "Dec", riders: 380 },
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

const RiderGrowthChart = () => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={riderData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
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
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45,140,60,0.06)" }} />
      <Bar dataKey="riders" fill="#2D8C3C" radius={[6, 6, 0, 0]} barSize={26} />
    </BarChart>
  </ResponsiveContainer>
);

export default RiderGrowthChart;
