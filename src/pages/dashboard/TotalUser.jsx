/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TotalUser = () => {
  const [chartHeight, setChartHeight] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 220) {
        setChartHeight(250); // Adjust height for mobile
      } else if (window.innerWidth < 768) {
        setChartHeight(220); // Adjust height for smaller tablets
      } else {
        setChartHeight(220); // Default height for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set the initial height

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const revenueData = [
    { month: "Jan", netRevenue: 1200 },
    { month: "Feb", netRevenue: 1500 },
    { month: "Mar", netRevenue: 800 },
    { month: "Apr", netRevenue: 1600 },
    { month: "May", netRevenue: 2000 },
    { month: "Jun", netRevenue: 1700 },
    { month: "Jul", netRevenue: 2200 },
    { month: "Aug", netRevenue: 1900 },
    { month: "Sept", netRevenue: 2100 },
    { month: "Oct", netRevenue: 1300 },
    { month: "Nov", netRevenue: 1500 },
    { month: "Dec", netRevenue: 800 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, netRevenue } = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white py-3 px-2 rounded">
          <p className="label">{`Month: ${month}`}</p>
          <p className="label">{`Revenue: $${netRevenue}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={revenueData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c0b5" stopOpacity={1} />
              <stop offset="95%" stopColor="#00c0b5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            dataKey="month"
             className="text-gray-600"
          />

          {/* <YAxis tickLine={true} /> */}
            <YAxis
                      tickLine={false}
                      className="text-gray-600"
                    />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="netRevenue"
            stroke="#00c0b5"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUser;
