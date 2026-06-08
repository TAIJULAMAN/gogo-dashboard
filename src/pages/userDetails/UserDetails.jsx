import { ConfigProvider, Modal, Table, Select, message } from "antd";
import { useMemo, useState } from "react";
import { IoSearch, IoChevronBack } from "react-icons/io5";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useBlockUserMutation } from "../../../Redux/features/user/userApi";
import dayjs from "dayjs";
import { imageUrl } from "../../../utils/server";

const statusColor = {
  Active: { bg: "bg-green-100", text: "text-green-700" },
  Approved: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Blocked: { bg: "bg-red-100", text: "text-red-700" },
};

function UserDetails() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllUsersQuery();
  const [blockUserMutation] = useBlockUserMutation();
  const dataSource = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.result)
    ? data.data.result
    : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [viewUser, setViewUser] = useState(null);
  const [blockUser, setBlockUser] = useState(null);
  const [approveUser, setApproveUser] = useState(null);
  const totalUsers = data?.stats?.totalUsers || 0;
  const activeUsers = data?.stats?.activeUsers || 0;
  const blockedUsers = data?.stats?.blockedUsers || 0;

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return dataSource.filter((r) => {
      const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
      const matchStatus = statusFilter ? r.status === statusFilter : true;
      const matchQuery = q
        ? [fullName, r.email, r.phoneNumber, r.role, r.status]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchStatus && matchQuery;
    });
  }, [dataSource, statusFilter, searchQuery]);

  const confirmBlockToggle = async () => {
    if (!blockUser) return;
    try {
      const newStatus = blockUser.status === "Blocked" ? "Approved" : "Blocked";
      
      const formData = new FormData();
      formData.append("status", newStatus);

      const res = await blockUserMutation({
        userId: blockUser._id,
        data: formData
      }).unwrap();

      if (res.success) {
        message.success(`User ${newStatus === "Blocked" ? "blocked" : "unblocked"} successfully`);
        setBlockUser(null);
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to update user status");
    }
  };

  const confirmApprove = () => {
    // Mutation placeholder
    setApproveUser(null);
  };

  const columns = [
    {
      title: "Full Name",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record.profileImage, `${record.firstName} ${record.lastName}`)}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span className="font-semibold leading-none">{record.firstName} {record.lastName}</span>
        </div>
      ),
    },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("MMM DD, YYYY")
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const displayStatus = status === "Blocked" ? "Blocked" : "Active";
        const c = statusColor[displayStatus] || statusColor.Active;
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${c.bg} ${c.text}`}>
            {displayStatus}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <button onClick={() => setViewUser(record)} title="View Details">
            <FaRegEye className="text-blue-500 w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
          </button>
          <button
            onClick={() => setBlockUser(record)}
            title={record.status === "Blocked" ? "Unblock" : "Block"}
          >
            <MdBlock
              className={`w-5 h-5 cursor-pointer transition-colors ${record.status === "Blocked"
                ? "text-gray-400 hover:text-gray-600"
                : "text-red-500 hover:text-red-700"
                }`}
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-[#2D8C3C] px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl sm:text-2xl font-bold">User Management</h1>

        {/* Mobile search */}
        <div className="relative w-full md:hidden mt-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-white text-[#0D0D0D] placeholder-gray-500 pl-10 pr-3 py-2 rounded-md focus:outline-none"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        <div className="ml-0 md:ml-auto flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="bg-white text-[#0D0D0D] placeholder-[#2D8C3C] pl-10 pr-3 py-2 rounded-md focus:outline-none"
            />
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D8C3C]" />
          </div>

          <ConfigProvider
            theme={{
              components: {
                Select: {
                  controlHeightLG: 44,
                  controlPaddingHorizontal: 12,
                  optionPadding: 10,
                  borderRadiusLG: 8,
                },
              },
            }}
          >
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              size="large"
              style={{ minWidth: 180 }}
              options={[
                { label: "Approved", value: "Approved" },
                { label: "Pending", value: "Pending" },
                { label: "Blocked", value: "Blocked" },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 mt-4">
        {[
          { label: "All Users", value: totalUsers, icon: LuUsers, color: "text-[#2D8C3C]", bg: "bg-green-50" },
          { label: "Active", value: activeUsers, icon: LuUsers, color: "text-green-600", bg: "bg-green-50" },
          { label: "Blocked", value: blockedUsers, icon: MdBlock, color: "text-red-500", bg: "bg-red-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`flex flex-col justify-center items-center p-6 ${bg} rounded-xl gap-1 shadow-sm`}>
            <Icon className={`w-8 h-8 ${color} mb-1`} />
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-sm font-semibold text-gray-600">{label}</p>
          </div>
        ))}
      </div>
      <ConfigProvider
        theme={{
          components: {
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
              cellFontSize: 15,
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
          rowKey="_id"
        />
      </ConfigProvider>
      <Modal open={!!viewUser} centered onCancel={() => setViewUser(null)} footer={null} width={620}>
        {viewUser && (
          <div>
            <div className="bg-gradient-to-r from-[#2D8C3C] to-[#3aad50] p-6 -m-6 mb-6 rounded-t-lg">
              <div className="flex items-center gap-5">
                <img
                  src={imageUrl(viewUser.profileImage, `${viewUser.firstName} ${viewUser.lastName}`)}
                  alt={viewUser.firstName}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">{viewUser.firstName} {viewUser.lastName}</h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {viewUser.role}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[viewUser.status]?.bg ?? "bg-gray-100"
                        } ${statusColor[viewUser.status]?.text ?? "text-gray-700"}`}
                    >
                      {viewUser.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Email", viewUser.email],
                ["Phone No", viewUser.phoneNumber],
                ["Role", viewUser.role],
                ["Joined Date", dayjs(viewUser.createdAt).format("MMM DD, YYYY")],
                ["Status", viewUser.status],
                ["Company", viewUser.companyName || "N/A"],
                ["TRN No", viewUser.trnVatNo || "N/A"],
                ["Referral", viewUser.referralCode || "N/A"],
              ].map(([label, val]) => (
                <div key={label} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">{label}</div>
                  <div className="text-base font-semibold">{val}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setViewUser(null)}
                className="bg-gray-500 text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Modal open={!!blockUser} centered onCancel={() => setBlockUser(null)} footer={null}>
        <div className="flex flex-col justify-center items-center py-8">
          <MdBlock
            className={`w-14 h-14 mb-4 ${blockUser?.status === "Blocked" ? "text-gray-400" : "text-red-500"
              }`}
          />
          <h2 className="text-2xl font-bold text-center text-[#2D8C3C] mb-2">
            {blockUser?.status === "Blocked" ? "Unblock User" : "Block User"}
          </h2>
          <p className="text-base text-center text-gray-600 mb-6">
            {blockUser?.status === "Blocked"
              ? `Do you want to unblock ${blockUser?.firstName} ${blockUser?.lastName}?`
              : `Do you want to block ${blockUser?.firstName} ${blockUser?.lastName}?`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setBlockUser(null)}
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmBlockToggle}
              className={`text-white font-semibold py-2 px-6 rounded-lg transition-colors ${blockUser?.status === "Blocked"
                ? "bg-[#2D8C3C] hover:bg-[#256a2f]"
                : "bg-red-500 hover:bg-red-700"
                }`}
            >
              {blockUser?.status === "Blocked" ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={!!approveUser} centered onCancel={() => setApproveUser(null)} footer={null}>
        <div className="flex flex-col justify-center items-center py-8">
          <MdCheckCircle className="w-14 h-14 mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-center text-[#2D8C3C] mb-2">Approve User</h2>
          <p className="text-base text-center text-gray-600 mb-6">
            Approve <span className="font-semibold">{approveUser?.firstName} {approveUser?.lastName}</span> as an active user?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setApproveUser(null)}
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmApprove}
              className="bg-[#2D8C3C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#256a2f] transition-colors"
            >
              Approve
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserDetails;
