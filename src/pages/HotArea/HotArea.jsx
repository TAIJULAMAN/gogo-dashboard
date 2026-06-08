import { useState } from "react";
import { IoChevronBack, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Table, Progress } from "antd";
import { FaFireAlt } from "react-icons/fa";
import { useGetHotAreasQuery } from "../../../Redux/features/hotArea/hotAreaApi";

const HotArea = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetHotAreasQuery();
  const areaData = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.result)
    ? data.data.result
    : [];

  const columns = [
    {
      title: "No",
      key: "no",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Area Name",
      dataIndex: "areaName",
      key: "areaName",
      render: (text) => <span className="font-bold text-gray-800">{text || "N/A"}</span>,
    },
    {
      title: "Driver Count",
      dataIndex: "numberOfRiders",
      key: "numberOfRiders",
      render: (count) => (
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#2D8C3C] min-w-[30px]">{count}</span>
          <Progress
            percent={(count / 250) * 100}
            showInfo={false}
            strokeColor={
              count > 180 ? "#ef4444" : count > 100 ? "#f59e0b" : "#2D8C3C"
            }
            size="small"
            className="w-24 md:w-32"
          />
        </div>
      ),
    },
    {
      title: "Order Count",
      dataIndex: "numberOfOrders",
      key: "numberOfOrders",
      render: (count) => (
        <div className="flex items-center gap-4">
          <span className="font-bold text-blue-600 min-w-[30px]">{count}</span>
          <Progress
            percent={(count / 800) * 100}
            showInfo={false}
            strokeColor={
              count > 500 ? "#ef4444" : count > 300 ? "#f59e0b" : "#3b82f6"
            }
            size="small"
            className="w-24 md:w-32"
          />
        </div>
      ),
    },
  ];

  const filteredData = areaData.filter(
    (item) =>
      item.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#2D8C3C] px-5 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold flex items-center gap-2">
            <FaFireAlt className="text-orange-400" /> Hot Area Tracking
          </h1>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search Area or City..."
            className="w-full bg-white/20 text-white placeholder-white/70 pl-10 pr-4 py-2.5 rounded-xl border border-white/30 focus:outline-none focus:bg-white/30 transition-all focus:ring-2 ring-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
        </div>
      </div>

      {/* Stats Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">
            Total Orders
          </p>
          <p className="text-3xl font-black text-red-700">
            {areaData.reduce((acc, curr) => acc + (curr.numberOfOrders || 0), 0)}
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
            Avg Orders Per Area
          </p>
          <p className="text-3xl font-black text-blue-700">
            {areaData.length > 0 
              ? Math.round(areaData.reduce((acc, curr) => acc + (curr.numberOfOrders || 0), 0) / areaData.length)
              : 0
            }
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">
            Active Drivers
          </p>
          <p className="text-3xl font-black text-green-700">
            {areaData.reduce((acc, curr) => acc + (curr.numberOfRiders || 0), 0)}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#f9fafb",
                headerColor: "#4b5563",
                headerSplitColor: "transparent",
                cellPaddingBlock: 20,
              },
            },
          }}
        >
          <Table
            dataSource={filteredData}
            columns={columns}
            loading={isLoading}
            pagination={{ pageSize: 8 }}
            className="border border-gray-50 rounded-xl overflow-hidden"
            scroll={{ x: "max-content" }}
            rowKey={(record) => record.areaName}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HotArea;
