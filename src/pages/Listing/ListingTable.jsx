import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useGetAllOrdersQuery } from "../../../Redux/features/orderManagement/orderManagementApi";
import dayjs from "dayjs";
import { imageUrl } from "../../../utils/server";

function ListingTable() {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [typeFilter, setTypeFilter] = useState();
    const [statusFilter, setStatusFilter] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading } = useGetAllOrdersQuery();
    const dataSource = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.result)
        ? data.data.result
        : [];

    const showViewModal = (listing) => {
        setSelectedListing(listing);
        setIsViewModalOpen(true);
    };

    const handleViewCancel = () => {
        setIsViewModalOpen(false);
        setSelectedListing(null);
    };

    const filteredData = useMemo(() => {
        const q = (searchQuery || "").toLowerCase().trim();
        return dataSource.filter((r) => {
            const customerName = `${r.user?.firstName || "Unknown"} ${r.user?.lastName || ""}`.toLowerCase();
            const matchType = typeFilter ? r.vehicleType === typeFilter : true;
            const matchStatus = statusFilter ? r.status === statusFilter : true;
            const matchQuery = q
                ? [customerName, r.vehicleType, r.status, r.pickup?.addressLine, r.dropoff?.addressLine]
                    .filter(Boolean)
                    .some((v) => String(v).toLowerCase().includes(q))
                : true;
            return matchType && matchStatus && matchQuery;
        });
    }, [dataSource, typeFilter, statusFilter, searchQuery]);

    const columns = [
        {
            title: "Customer Name",
            key: "name",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={imageUrl(record.user?.profileImage, record.user ? `${record.user.firstName} ${record.user.lastName}` : "")}
                        className="w-10 h-10 object-cover rounded-full border border-gray-200"
                        alt="user"
                    />
                    <span className="font-semibold text-gray-800">
                        {record.user ? `${record.user.firstName} ${record.user.lastName}` : "Unknown User"}
                    </span>
                </div>
            ),
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => dayjs(date).format("MMM DD, YYYY"),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <span className="font-bold text-[#2D8C3C]">AED {Number(price || 0).toFixed(2)}</span>,
        },
        {
            title: "Vehicle",
            dataIndex: "vehicleType",
            key: "vehicleType",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : status === "Pending"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
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
                <div className="flex items-center gap-2">
                    <button onClick={() => showViewModal(record)}>
                        <FaRegEye className="text-[#2D8C3C] w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </button>
                </div>
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
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8C3C] focus:border-transparent"
                    />
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Select
                        placeholder="Filter by Vehicle"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        allowClear
                        className="w-full md:w-48"
                        size="large"
                        options={[
                            { label: "Bike", value: "Bike" },
                            { label: "Car", value: "Car" },
                        ]}
                    />
                    <Select
                        placeholder="Filter by Status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        allowClear
                        className="w-full md:w-48"
                        size="large"
                        options={[
                            { label: "Pending", value: "Pending" },
                            { label: "Completed", value: "Completed" },
                            { label: "Cancelled", value: "Cancelled" },
                        ]}
                    />
                </div>
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
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    rowKey="_id"
                />

                <Modal
                    open={isViewModalOpen}
                    centered
                    onCancel={handleViewCancel}
                    footer={null}
                    width={800}
                    className="listing-view-modal"
                >
                    {selectedListing && (
                        <div className="relative">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                                Order Details: #{selectedListing._id.slice(-6)}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Customer</div>
                                        <div className="text-base font-semibold">
                                            {selectedListing.user ? `${selectedListing.user.firstName} ${selectedListing.user.lastName}` : "Unknown User"}
                                        </div>
                                        <div className="text-sm text-gray-500">{selectedListing.user?.phoneNumber || "No phone number"}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Vehicle & Distance</div>
                                        <div className="text-base font-semibold">{selectedListing.vehicleType}</div>
                                        <div className="text-sm text-gray-500">{selectedListing.distanceKm} km trip</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Pricing</div>
                                        <div className="text-lg font-bold text-[#2D8C3C]">AED {Number(selectedListing.price || 0).toFixed(2)}</div>
                                        <div className="text-sm text-gray-400 line-through">Orig: AED {Number(selectedListing.originalPrice || 0).toFixed(2)}</div>
                                    </div>
                                </div>

                                {/* Status & Dates */}
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Order Status</div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedListing.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                                            {selectedListing.status}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-2">Payment: {selectedListing.paymentStatus}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Pickup Address</div>
                                        <div className="text-sm leading-relaxed">{selectedListing.pickup?.addressLine || "N/A"}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="text-gray-500 text-xs uppercase font-bold mb-1">Dropoff Address</div>
                                        <div className="text-sm leading-relaxed">{selectedListing.dropoff?.addressLine || "N/A"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer actions */}
                            <div className="flex justify-end mt-8 pt-6 border-t">
                                <button
                                    onClick={handleViewCancel}
                                    className="bg-gray-800 text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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

export default ListingTable;
