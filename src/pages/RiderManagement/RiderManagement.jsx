import { ConfigProvider, Modal, Table, Select, Tag } from "antd";
import { useMemo, useState } from "react";
import { IoSearch, IoChevronBack } from "react-icons/io5";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import { FaRegEye, FaMotorcycle } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const initialRiders = [
  {
    key: "1",
    fullName: "Carlos Rivera",
    email: "carlos@example.com",
    phone: "+1 555 100 0001",
    vehicle: "Motorcycle",
    plateNo: "RDR-1001",
    joined: "2024-01-08",
    totalDeliveries: 312,
    status: "Active",
  },
  {
    key: "2",
    fullName: "Aisha Patel",
    email: "aisha@example.com",
    phone: "+1 555 100 0002",
    vehicle: "Bicycle",
    plateNo: "RDR-1002",
    joined: "2024-02-14",
    totalDeliveries: 89,
    status: "Pending",
  },
  {
    key: "3",
    fullName: "Marcus Lee",
    email: "marcus@example.com",
    phone: "+1 555 100 0003",
    vehicle: "Scooter",
    plateNo: "RDR-1003",
    joined: "2024-03-21",
    totalDeliveries: 456,
    status: "Active",
  },
  {
    key: "4",
    fullName: "Fatima Nour",
    email: "fatima@example.com",
    phone: "+1 555 100 0004",
    vehicle: "Motorcycle",
    plateNo: "RDR-1004",
    joined: "2024-04-05",
    totalDeliveries: 203,
    status: "Blocked",
  },
  {
    key: "5",
    fullName: "Jake Thompson",
    email: "jake@example.com",
    phone: "+1 555 100 0005",
    vehicle: "Car",
    plateNo: "RDR-1005",
    joined: "2024-05-17",
    totalDeliveries: 128,
    status: "Active",
  },
  {
    key: "6",
    fullName: "Lily Chen",
    email: "lily@example.com",
    phone: "+1 555 100 0006",
    vehicle: "Scooter",
    plateNo: "RDR-1006",
    joined: "2024-06-29",
    totalDeliveries: 67,
    status: "Pending",
  },
  {
    key: "7",
    fullName: "Omar Hassan",
    email: "omar@example.com",
    phone: "+1 555 100 0007",
    vehicle: "Bicycle",
    plateNo: "RDR-1007",
    joined: "2024-07-11",
    totalDeliveries: 534,
    status: "Active",
  },
  {
    key: "8",
    fullName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+1 555 100 0008",
    vehicle: "Motorcycle",
    plateNo: "RDR-1008",
    joined: "2024-08-23",
    totalDeliveries: 291,
    status: "Active",
  },
  {
    key: "9",
    fullName: "Ethan Brooks",
    email: "ethan@example.com",
    phone: "+1 555 100 0009",
    vehicle: "Car",
    plateNo: "RDR-1009",
    joined: "2024-09-09",
    totalDeliveries: 175,
    status: "Blocked",
  },
  {
    key: "10",
    fullName: "Sofia Ramirez",
    email: "sofia@example.com",
    phone: "+1 555 100 0010",
    vehicle: "Scooter",
    plateNo: "RDR-1010",
    joined: "2024-10-30",
    totalDeliveries: 44,
    status: "Pending",
  },
];

const statusColor = {
  Active: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
  Blocked: { bg: "bg-red-100", text: "text-red-700" },
};

function RiderManagement() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState(initialRiders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [vehicleFilter, setVehicleFilter] = useState(undefined);

  // Modals
  const [viewRider, setViewRider] = useState(null);
  const [blockRider, setBlockRider] = useState(null);
  const [approveRider, setApproveRider] = useState(null);

  // ─── Stats ───────────────────────────────────────
  const totalRiders = dataSource.length;
  const activeRiders = dataSource.filter((r) => r.status === "Active").length;
  const pendingRiders = dataSource.filter((r) => r.status === "Pending").length;
  const blockedRiders = dataSource.filter((r) => r.status === "Blocked").length;

  // ─── Filter ──────────────────────────────────────
  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return dataSource.filter((r) => {
      const matchStatus = statusFilter ? r.status === statusFilter : true;
      const matchVehicle = vehicleFilter ? r.vehicle === vehicleFilter : true;
      const matchQuery = q
        ? [r.fullName, r.email, r.phone, r.vehicle, r.plateNo, r.status]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchStatus && matchVehicle && matchQuery;
    });
  }, [dataSource, statusFilter, vehicleFilter, searchQuery]);

  // ─── Block / Unblock ─────────────────────────────
  const confirmBlockToggle = () => {
    setDataSource((prev) =>
      prev.map((r) =>
        r.key === blockRider.key
          ? { ...r, status: r.status === "Blocked" ? "Active" : "Blocked" }
          : r
      )
    );
    setBlockRider(null);
  };

  // ─── Approve Pending ─────────────────────────────
  const confirmApprove = () => {
    setDataSource((prev) =>
      prev.map((r) =>
        r.key === approveRider.key ? { ...r, status: "Active" } : r
      )
    );
    setApproveRider(null);
  };

  // ─── Columns ─────────────────────────────────────
  const columns = [
    {
      title: "No",
      key: "no",
      width: 60,
      render: (_, _r, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value) => (
        <div className="flex items-center gap-3">
          <img
            src={`/avatar.png`}
            className="w-10 h-10 object-cover rounded-full"
            alt="Rider Avatar"
          />
          <span className="font-semibold leading-none">{value}</span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
    { title: "Plate No", dataIndex: "plateNo", key: "plateNo" },
    { title: "Deliveries", dataIndex: "totalDeliveries", key: "totalDeliveries", align: "center" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const c = statusColor[status] ?? { bg: "bg-gray-100", text: "text-gray-700" };
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${c.bg} ${c.text}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* View */}
          <button onClick={() => setViewRider(record)} title="View Details">
            <FaRegEye className="text-blue-500 w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
          </button>
          {/* Approve (only for Pending) */}
          {record.status === "Pending" && (
            <button onClick={() => setApproveRider(record)} title="Approve Rider">
              <MdCheckCircle className="text-green-500 w-5 h-5 cursor-pointer hover:text-green-700 transition-colors" />
            </button>
          )}
          {/* Block / Unblock */}
          <button onClick={() => setBlockRider(record)} title={record.status === "Blocked" ? "Unblock" : "Block"}>
            <MdBlock
              className={`w-5 h-5 cursor-pointer transition-colors ${
                record.status === "Blocked"
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
      {/* ── Page Header ── */}
      <div className="bg-[#2D8C3C] px-4 md:px-5 py-3 rounded-md mb-5 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl sm:text-2xl font-bold">Rider Management</h1>

        {/* Mobile search */}
        <div className="relative w-full md:hidden mt-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search riders..."
            className="w-full bg-white text-[#0D0D0D] placeholder-gray-500 pl-10 pr-3 py-2 rounded-md focus:outline-none"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        <div className="ml-0 md:ml-auto flex flex-wrap items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search riders..."
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
              style={{ minWidth: 160 }}
              options={[
                { label: "Active", value: "Active" },
                { label: "Pending", value: "Pending" },
                { label: "Blocked", value: "Blocked" },
              ]}
            />
            <Select
              placeholder="Filter by Vehicle"
              value={vehicleFilter}
              onChange={setVehicleFilter}
              allowClear
              size="large"
              style={{ minWidth: 160 }}
              options={[
                { label: "Motorcycle", value: "Motorcycle" },
                { label: "Scooter", value: "Scooter" },
                { label: "Bicycle", value: "Bicycle" },
                { label: "Car", value: "Car" },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Riders", value: totalRiders, icon: FaMotorcycle, color: "text-[#2D8C3C]", bg: "bg-green-50" },
          { label: "Active", value: activeRiders, icon: LuUsers, color: "text-green-600", bg: "bg-green-50" },
          { label: "Pending", value: pendingRiders, icon: LuUsers, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Blocked", value: blockedRiders, icon: MdBlock, color: "text-red-500", bg: "bg-red-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`flex flex-col justify-center items-center p-6 ${bg} rounded-xl gap-1 shadow-sm`}>
            <Icon className={`w-8 h-8 ${color} mb-1`} />
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-sm font-semibold text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
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
          pagination={{ pageSize: 8 }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>

      {/* ── View Modal ── */}
      <Modal open={!!viewRider} centered onCancel={() => setViewRider(null)} footer={null} width={620}>
        {viewRider && (
          <div>
            <div className="bg-gradient-to-r from-[#2D8C3C] to-[#3aad50] p-6 -m-6 mb-6 rounded-t-lg">
              <div className="flex items-center gap-5">
                <img
                  src={`https://avatar.iran.liara.run/public/${viewRider.key}`}
                  alt={viewRider.fullName}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-1">{viewRider.fullName}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColor[viewRider.status]?.bg ?? "bg-gray-100"
                    } ${statusColor[viewRider.status]?.text ?? "text-gray-700"}`}
                  >
                    {viewRider.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Email", viewRider.email],
                ["Phone", viewRider.phone],
                ["Vehicle Type", viewRider.vehicle],
                ["Plate Number", viewRider.plateNo],
                ["Total Deliveries", viewRider.totalDeliveries],
                ["Joined Date", viewRider.joined],
              ].map(([label, val]) => (
                <div key={label} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-500 text-sm mb-1">{label}</div>
                  <div className="text-base font-semibold">{val}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setViewRider(null)}
                className="bg-gray-500 text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Block / Unblock Modal ── */}
      <Modal open={!!blockRider} centered onCancel={() => setBlockRider(null)} footer={null}>
        <div className="flex flex-col justify-center items-center py-8">
          <MdBlock className={`w-14 h-14 mb-4 ${blockRider?.status === "Blocked" ? "text-gray-400" : "text-red-500"}`} />
          <h2 className="text-2xl font-bold text-center text-[#2D8C3C] mb-2">
            {blockRider?.status === "Blocked" ? "Unblock Rider" : "Block Rider"}
          </h2>
          <p className="text-base text-center text-gray-600 mb-6">
            {blockRider?.status === "Blocked"
              ? `Do you want to unblock ${blockRider?.fullName}?`
              : `Do you want to block ${blockRider?.fullName}?`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setBlockRider(null)}
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmBlockToggle}
              className={`text-white font-semibold py-2 px-6 rounded-lg transition-colors ${
                blockRider?.status === "Blocked"
                  ? "bg-[#2D8C3C] hover:bg-[#256a2f]"
                  : "bg-red-500 hover:bg-red-700"
              }`}
            >
              {blockRider?.status === "Blocked" ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Approve Modal ── */}
      <Modal open={!!approveRider} centered onCancel={() => setApproveRider(null)} footer={null}>
        <div className="flex flex-col justify-center items-center py-8">
          <MdCheckCircle className="w-14 h-14 mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-center text-[#2D8C3C] mb-2">Approve Rider</h2>
          <p className="text-base text-center text-gray-600 mb-6">
            Approve <span className="font-semibold">{approveRider?.fullName}</span> as an active rider?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setApproveRider(null)}
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

export default RiderManagement;
