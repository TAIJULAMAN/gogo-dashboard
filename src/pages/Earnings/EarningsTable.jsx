import { ConfigProvider, Modal, Table } from "antd";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useGetAdminEarningsQuery } from "../../../Redux/features/earnings/earningsApi";
import dayjs from "dayjs";
import { imageUrl } from "../../../utils/server";

function EarningsTable() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAdminEarningsQuery();
  const dataSource = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.result)
    ? data.data.result
    : [];

  const showViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const mappedDataSource = useMemo(() => {
    return dataSource.map((order) => {
      const customer = order.user;
      const customerName = customer?.fullName || 
        `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim() || 
        "Unknown User";
      return {
        ...order,
        fullName: customerName,
        date: order.completedAt || order.createdAt,
        commission: order.price,
        parcel: order._id,
      };
    });
  }, [dataSource]);

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return mappedDataSource.filter((r) => {
      const matchQuery = q
        ? [r.fullName, r.parcel]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchQuery;
    });
  }, [mappedDataSource, searchQuery]);

  const columns = [
    {
      title: "No",
      key: "no",
      width: 70,
      render: (_, _r, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record.user?.profileImage, value)}
            className="w-10 h-10 object-cover rounded-full"
            alt="Avatar"
          />
          <span className="leading-none font-semibold text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("MMM DD, YYYY"),
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (val) => <span className="font-bold text-[#2D8C3C]">AED {Number(val || 0).toFixed(2)}</span>,
    },
    {
      title: "Parcel ID",
      dataIndex: "parcel",
      key: "parcel",
      render: (val) => <span className="text-gray-500 text-sm font-mono">#{val?.slice(-6).toUpperCase()}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button onClick={() => showViewModal(record)}>
          <FaRegEye className="text-[#2D8C3C] w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#00c0b5",
            },
            Pagination: {
              colorPrimaryBorder: "#2D8C3C",
              colorBorder: "#2D8C3C",
              colorPrimaryHover: "#2D8C3C",
              colorTextPlaceholder: "#2D8C3C",
              itemActiveBgDisabled: "#2D8C3C",
              colorPrimary: "#2D8C3C",
            },
            Table: {
              headerBg: "#2D8C3C",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#2D8C3C",
            },
          },
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          rowKey="parcel"
        />

        <Modal
          open={isViewModalOpen}
          centered
          onCancel={handleViewCancel}
          footer={null}
          width={600}
          className="user-view-modal"
        >
          {selectedUser && (
            <div className="relative">
              {/* Header */}
              <div className="bg-[#2D8C3C] p-6 -m-6 mb-6 rounded-t-lg">
                <div className="flex items-center gap-6">
                  <img
                    src={imageUrl(selectedUser.user?.profileImage, selectedUser.fullName)}
                    alt={selectedUser.fullName}
                    className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover"
                  />
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-1">
                      {selectedUser.fullName}
                    </h2>
                    <p className="text-white/80 text-sm">
                      Earning Date: {dayjs(selectedUser.date).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Commission Amount</span>
                  <span className="text-2xl font-black text-[#2D8C3C]">AED {Number(selectedUser.commission || 0).toFixed(2)}</span>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="text-gray-500 font-medium mb-1 text-xs uppercase tracking-wider">Parcel ID</div>
                  <div className="text-base font-mono font-bold text-gray-700">#{selectedUser.parcel?.slice(-6).toUpperCase()}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handleViewCancel}
                  className="bg-gray-800 text-white font-semibold px-10 py-2.5 rounded-xl hover:bg-gray-700 transition-colors shadow-lg shadow-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default EarningsTable;
