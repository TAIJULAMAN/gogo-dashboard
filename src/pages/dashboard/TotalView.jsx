/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetUserGrowthQuery } from "../../../Redux/features/dashboard/dashboardApi";

const defaultData = [
  { month: "Jan", users: 0 },
  { month: "Feb", users: 0 },
  { month: "Mar", users: 0 },
  { month: "Apr", users: 0 },
  { month: "May", users: 0 },
  { month: "Jun", users: 0 },
  { month: "Jul", users: 0 },
  { month: "Aug", users: 0 },
  { month: "Sep", users: 0 },
  { month: "Oct", users: 0 },
  { month: "Nov", users: 0 },
  { month: "Dec", users: 0 },
];

const TotalView = ({ year }) => {
  const [chartHeight, setChartHeight] = useState(220);

  const { data, isLoading } = useGetUserGrowthQuery({ year });

  const chartData = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return defaultData;

    const monthlyCounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    data.data.forEach((item) => {
      if (!item.date) return;
      const dateParts = item.date.split("-");
      if (dateParts.length < 2) return;
      const monthIndex = parseInt(dateParts[1], 10) - 1; // 0-11
      const monthName = months[monthIndex];
      if (monthName) {
        monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + (item.count || 0);
      }
    });

    return defaultData.map((d) => ({
      ...d,
      users: monthlyCounts[d.month] !== undefined ? monthlyCounts[d.month] : 0,
    }));
  }, [data]);

  const maxVal = useMemo(() => {
    if (!chartData || chartData.length === 0) return 100;
    return Math.max(...chartData.map((item) => item.users), 10);
  }, [chartData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(250);
      } else {
        setChartHeight(220);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, users } = payload[0].payload;
      return (
        <div className="bg-white shadow-md p-3 rounded-md border text-gray-700">
          <p className="font-medium">Month: {month}</p>
          <p className="font-medium">Users: {users}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={isLoading ? defaultData : chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <XAxis 
            tickLine={false} 
            dataKey="month" 
            className="text-xs text-gray-400" 
            axisLine={false} 
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, maxVal + 5]}
            className="text-xs text-gray-400"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45,140,60,0.05)" }} />
          <Bar
            barSize={20}
            radius={[4, 4, 0, 0]}
            dataKey="users"
            fill="#2D8C3C"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalView;
