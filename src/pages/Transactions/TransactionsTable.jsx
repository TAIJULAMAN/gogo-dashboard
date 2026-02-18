import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

function TransactionsTable() {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [statusFilter, setStatusFilter] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const showViewModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsViewModalOpen(true);
    };

    const handleViewCancel = () => {
        setIsViewModalOpen(false);
        setSelectedTransaction(null);
    };

    const [dataSource] = useState([
        {
            key: "1",
            txnId: "TXN001",
            influencer: "Sarah Johnson",
            campaign: "Luxury Resort Stay",
            amount: "$250.00",
            date: "Nov 15, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/1",
        },
        {
            key: "2",
            txnId: "TXN002",
            influencer: "Mike Chen",
            campaign: "Beachfront Villa Promotion",
            amount: "$300.00",
            date: "Nov 12, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/2",
        },
        {
            key: "3",
            txnId: "TXN003",
            influencer: "Emma Rodriguez",
            campaign: "Mountain Retreat Experience",
            amount: "$180.00",
            date: "Nov 10, 2024",
            status: "Pending",
            avatar: "https://avatar.iran.liara.run/public/3",
        },
        {
            key: "4",
            txnId: "TXN004",
            influencer: "David Park",
            campaign: "Downtown Luxury Apartment",
            amount: "$220.00",
            date: "Nov 8, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/4",
        },
        {
            key: "5",
            txnId: "TXN005",
            influencer: "Lisa Thompson",
            campaign: "Penthouse Suite Showcase",
            amount: "$400.00",
            date: "Nov 5, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/5",
        },
        {
            key: "6",
            txnId: "TXN006",
            influencer: "Alex Johnson",
            campaign: "Garden Cottage Stay",
            amount: "$160.00",
            date: "Nov 3, 2024",
            status: "Failed",
            avatar: "https://avatar.iran.liara.run/public/6",
        },
        {
            key: "7",
            txnId: "TXN007",
            influencer: "Sophie Anderson",
            campaign: "Lakeside Villa Experience",
            amount: "$280.00",
            date: "Nov 1, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/7",
        },
        {
            key: "8",
            txnId: "TXN008",
            influencer: "James Taylor",
            campaign: "Urban Loft Promotion",
            amount: "$190.00",
            date: "Oct 28, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/8",
        },
        {
            key: "9",
            txnId: "TXN009",
            influencer: "Olivia Brown",
            campaign: "Coastal Paradise Stay",
            amount: "$350.00",
            date: "Oct 25, 2024",
            status: "Pending",
            avatar: "https://avatar.iran.liara.run/public/9",
        },
        {
            key: "10",
            txnId: "TXN010",
            influencer: "Noah Davis",
            campaign: "City Center Apartment",
            amount: "$210.00",
            date: "Oct 22, 2024",
            status: "Completed",
            avatar: "https://avatar.iran.liara.run/public/10",
        },
    ]);

    const filteredData = useMemo(() => {
        const q = (searchQuery || "").toLowerCase().trim();
        return dataSource.filter((r) => {
            const matchStatus = statusFilter ? r.status === statusFilter : true;
            const matchQuery = q
                ? [r.txnId, r.influencer, r.campaign, r.amount, r.status]
                    .filter(Boolean)
                    .some((v) => String(v).toLowerCase().includes(q))
                : true;
            return matchStatus && matchQuery;
        });
    }, [dataSource, statusFilter, searchQuery]);

    const columns = [
        {
            title: "TXN ID",
            dataIndex: "txnId",
            key: "txnId",
            render: (value) => <span className="font-semibold text-gray-700">{value}</span>,
        },
        {
            title: "Influencer",
            dataIndex: "influencer",
            key: "influencer",
            render: (value, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.avatar}
                        className="w-10 h-10 object-cover rounded-full"
                        alt={value}
                    />
                    <span className="font-semibold">{value}</span>
                </div>
            ),
        },
        { title: "Campaign", dataIndex: "campaign", key: "campaign" },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <span className="font-semibold text-[#2D8C3C]">{amount}</span>,
        },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {status}
                </span>
            ),
        },
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
            {/* Search and Filter */}
            <div className="mb-5 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8C3C] focus:border-transparent"
                    />
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
                <Select
                    placeholder="Filter by Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    allowClear
                    className="w-full md:w-48"
                    size="large"
                    popupMatchSelectWidth={false}
                    dropdownStyle={{ paddingTop: 8, paddingBottom: 8 }}
                    options={[
                        { label: "Completed", value: "Completed" },
                        { label: "Pending", value: "Pending" },
                        { label: "Failed", value: "Failed" },
                    ]}
                />
            </div>

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
                    className="transaction-view-modal"
                >
                    {selectedTransaction && (
                        <div className="relative">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#2D8C3C] to-[#2D8C3C] p-6 -m-6 mb-6 rounded-t-lg">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={selectedTransaction.avatar}
                                            alt={selectedTransaction.influencer}
                                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                        />
                                    </div>
                                    <div className="text-white">
                                        <h2 className="text-3xl font-bold mb-2">
                                            {selectedTransaction.txnId}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                                {selectedTransaction.influencer}
                                            </span>
                                            <span
                                                className={`backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium ${selectedTransaction.status === "Completed"
                                                    ? "bg-green-500/30"
                                                    : selectedTransaction.status === "Pending"
                                                        ? "bg-yellow-500/30"
                                                        : "bg-red-500/30"
                                                    }`}
                                            >
                                                {selectedTransaction.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Transaction ID</div>
                                    <div className="text-lg font-semibold">
                                        {selectedTransaction.txnId}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Influencer</div>
                                    <div className="text-lg font-semibold">
                                        {selectedTransaction.influencer}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Campaign</div>
                                    <div className="text-lg font-semibold">
                                        {selectedTransaction.campaign}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Amount</div>
                                    <div className="text-lg font-semibold text-[#2D8C3C]">
                                        {selectedTransaction.amount}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Date</div>
                                    <div className="text-lg font-semibold">
                                        {selectedTransaction.date}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Status</div>
                                    <div className="text-lg font-semibold">
                                        {selectedTransaction.status}
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-end items-center gap-3 mt-8 pt-6 border-t border-gray-200">
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

export default TransactionsTable;
