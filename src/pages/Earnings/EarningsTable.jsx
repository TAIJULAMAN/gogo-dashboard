import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch, IoChevronBack, IoAddOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

function EarningsTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      fullName: "John Doe",
      date: "2024-01-12",
      price: "200",
      ticketName: "FanZone",
      trxId: "123456789",
    },
    {
      key: "2",
      fullName: "Sarah Smith",
      date: "2024-02-18",
      price: "350",
      ticketName: "VIP",
      trxId: "987654321",
    },
    {
      key: "3",
      fullName: "Michael Brown",
      date: "2024-03-05",
      price: "150",
      ticketName: "Regular",
      trxId: "456789123",
    },
    {
      key: "4",
      fullName: "Emily Johnson",
      date: "2024-04-22",
      price: "400",
      ticketName: "Premium",
      trxId: "654321987",
    },
    {
      key: "5",
      fullName: "David Wilson",
      date: "2024-05-11",
      price: "250",
      ticketName: "FanZone",
      trxId: "112233445",
    },
    {
      key: "6",
      fullName: "Sophia Davis",
      date: "2024-06-30",
      price: "300",
      ticketName: "VIP",
      trxId: "778899001",
    },
    {
      key: "7",
      fullName: "James Miller",
      date: "2024-07-19",
      price: "180",
      ticketName: "Regular",
      trxId: "998877665",
    },
    {
      key: "8",
      fullName: "Olivia Taylor",
      date: "2024-08-27",
      price: "420",
      ticketName: "Premium",
      trxId: "556677889",
    },
    {
      key: "9",
      fullName: "Daniel Anderson",
      date: "2024-09-14",
      price: "220",
      ticketName: "FanZone",
      trxId: "334455667",
    },
    {
      key: "10",
      fullName: "Ava Thomas",
      date: "2024-10-03",
      price: "500",
      ticketName: "VIP",
      trxId: "221133445",
    },
    {
      key: "11",
      fullName: "William Jackson",
      date: "2024-11-29",
      price: "160",
      ticketName: "Regular",
      trxId: "889900112",
    },
  ]);

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return dataSource.filter((r) => {
      const matchRole = roleFilter ? r.role === roleFilter : true;
      const matchQuery = q
        ? [r.fullName, r.email, r.phone, r.clinic, r.role]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchRole && matchQuery;
    });
  }, [dataSource, roleFilter, searchQuery]);

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
            src={`https://avatar.iran.liara.run/public/${record.key}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span className="leading-none">{value}</span>
        </div>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Ticket Name", dataIndex: "ticketName", key: "ticketName" },
    { title: "Trx ID", dataIndex: "trxId", key: "trxId" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button onClick={() => showViewModal(record)}>
          <FaRegEye className="text-blue-500 w-5 h-5 cursor-pointer" />
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
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />

        {/* View Modal */}
        <Modal
          open={isViewModalOpen}
          centered
          onCancel={handleViewCancel}
          footer={null}
          width={800}
          className="user-view-modal"
        >
          {selectedUser && (
            <div className="relative">
              {/* Header with green gradient */}
              <div className="bg-gradient-to-r from-[#2D8C3C] to-[#2D8C3C] p-6 -m-6 mb-6 rounded-t-lg">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={`https://avatar.iran.liara.run/public/${selectedUser.key}`}
                      alt={selectedUser.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedUser.fullName}
                    </h2>
                    <div className="flex items-center gap-3 mb-1">
                      {/* <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {selectedUser.clinic}
                      </span> */}
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        Date: {selectedUser.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-600 text-sm">Price</div>
                  <div className="text-lg font-semibold">{selectedUser.price}</div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-600 text-sm">Ticket Name</div>
                  <div className="text-lg font-semibold">{selectedUser.ticketName}</div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="text-gray-600 text-sm">Trx ID</div>
                  <div className="text-lg font-semibold">{selectedUser.trxId}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleViewCancel}
                  className="bg-gray-500 text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-600 transition-colors"
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
