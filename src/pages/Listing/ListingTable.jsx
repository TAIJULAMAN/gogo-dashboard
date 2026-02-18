import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";

function ListingTable() {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [typeFilter, setTypeFilter] = useState();
    const [statusFilter, setStatusFilter] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const showViewModal = (listing) => {
        setSelectedListing(listing);
        setIsViewModalOpen(true);
    };

    const handleViewCancel = () => {
        setIsViewModalOpen(false);
        setSelectedListing(null);
    };

    const [dataSource] = useState([
        {
            key: "1",
            name: "John Doe",
            date: "2025-11-27",
            type: "Apartment",
            status: "Completed",
            location: "Miami Beach, Florida",
        },
        {
            key: "2",
            name: "Sarah Smith",
            date: "2025-10-02",
            type: "Resort",
            status: "Cancelled",
            location: "Los Angeles, California",
        },
        {
            key: "3",
            name: "Michael Brown",
            date: "2025-09-18",
            type: "Hotel",
            status: "Completed",
            location: "Chicago, Illinois",
        },
        {
            key: "4",
            name: "Emily Johnson",
            date: "2025-08-12",
            type: "Villa",
            status: "Completed",
            location: "Orlando, Florida",
        },
        {
            key: "5",
            name: "David Wilson",
            date: "2025-07-21",
            type: "Apartment",
            status: "Completed",
            location: "San Diego, California",
        },
        {
            key: "6",
            name: "Sophia Davis",
            date: "2025-06-30",
            type: "Lodge",
            status: "Completed",
            location: "Denver, Colorado",
        },
        {
            key: "7",
            name: "James Miller",
            date: "2025-05-14",
            type: "Resort",
            status: "Completed",
            location: "Honolulu, Hawaii",
        },
        {
            key: "8",
            name: "Olivia Taylor",
            date: "2025-04-29",
            type: "Cabin",
            status: "Completed",
            location: "Aspen, Colorado",
        },
        {
            key: "9",
            name: "Daniel Anderson",
            date: "2025-03-15",
            type: "Hotel",
            status: "Completed",
            location: "New York, New York",
        },
        {
            key: "10",
            name: "Ava Thomas",
            date: "2025-02-08",
            type: "Villa",
            status: "Completed",
            location: "Santa Monica, California",
        },
    ]);

    const filteredData = useMemo(() => {
        const q = (searchQuery || "").toLowerCase().trim();
        return dataSource.filter((r) => {
            const matchType = typeFilter ? r.type === typeFilter : true;
            const matchStatus = statusFilter ? r.status === statusFilter : true;
            const matchQuery = q
                ? [r.name, r.type, r.location, r.status]
                    .filter(Boolean)
                    .some((v) => String(v).toLowerCase().includes(q))
                : true;
            return matchType && matchStatus && matchQuery;
        });
    }, [dataSource, typeFilter, statusFilter, searchQuery]);

    const columns = [
        {
            title: "Image",
            key: "image",
            width: 100,
            render: (_, record) => (
                <img
                    src="/avatar.png"
                    className="w-12 h-12 object-cover rounded-full"
                    alt={record.name}
                />
            ),
        },
        {
            title: "Customer Name",
            dataIndex: "name",
            key: "name",
            render: (value) => <span className="font-semibold">{value}</span>,
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
                        : status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {status}
                </span>
            ),
        },
        { title: "Location", dataIndex: "location", key: "location" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <button onClick={() => showViewModal(record)}>
                        <FaRegEye className="text-blue-500 w-5 h-5 cursor-pointer" />
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
                        placeholder="Search listings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8C3C] focus:border-transparent"
                    />
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
                <div className="flex gap-3 w-full md:w-auto">

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
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                />

                {/* View Modal */}
                <Modal
                    open={isViewModalOpen}
                    centered
                    onCancel={handleViewCancel}
                    footer={null}
                    width={900}
                    className="listing-view-modal"
                >
                    {selectedListing && (
                        <div className="relative">
                            {/* Header Image */}
                            <div className="relative -m-6 mb-6 h-64 overflow-hidden rounded-t-lg">
                                <img
                                    src={selectedListing.image}
                                    alt={selectedListing.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-3xl font-bold mb-2">
                                        {selectedListing.name}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                            {selectedListing.type}
                                        </span>
                                        <span
                                            className={`backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium ${selectedListing.status === "Verified"
                                                ? "bg-green-500/30"
                                                : "bg-yellow-500/30"
                                                }`}
                                        >
                                            {selectedListing.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Location</div>
                                    <div className="text-lg font-semibold">
                                        {selectedListing.location}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Listed Date</div>
                                    <div className="text-lg font-semibold">
                                        {selectedListing.date}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Property Type</div>
                                    <div className="text-lg font-semibold">
                                        {selectedListing.type}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <div className="text-gray-600 text-sm">Verification Status</div>
                                    <div className="text-lg font-semibold">
                                        {selectedListing.status}
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
                                <button className="bg-[#2D8C3C] text-white font-semibold px-8 py-2 rounded-lg hover:bg-[#e6755f] transition-colors">
                                    Edit Listing
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
