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
            name: "GreenStay Villa",
            date: "2025-11-27",
            type: "Apartment",
            status: "Verified",
            location: "Miami Beach, Florida",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
        },
        {
            key: "2",
            name: "Sunset Crest Resort",
            date: "2025-10-02",
            type: "Resort",
            status: "Pending",
            location: "Los Angeles, California",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        },
        {
            key: "3",
            name: "UrbanNest Suites",
            date: "2025-09-18",
            type: "Hotel",
            status: "Verified",
            location: "Chicago, Illinois",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
        },
        {
            key: "4",
            name: "PalmLeaf Residency",
            date: "2025-08-12",
            type: "Villa",
            status: "Verified",
            location: "Orlando, Florida",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
        },
        {
            key: "5",
            name: "LuxeBay Apartments",
            date: "2025-07-21",
            type: "Apartment",
            status: "Verified",
            location: "San Diego, California",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        },
        {
            key: "6",
            name: "Evergreen Hills Lodge",
            date: "2025-06-30",
            type: "Lodge",
            status: "Pending",
            location: "Denver, Colorado",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        },
        {
            key: "7",
            name: "BlueWater Harmony Stay",
            date: "2025-05-14",
            type: "Resort",
            status: "Verified",
            location: "Honolulu, Hawaii",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        },
        {
            key: "8",
            name: "PeakView Cabin",
            date: "2025-04-29",
            type: "Cabin",
            status: "Verified",
            location: "Aspen, Colorado",
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
        },
        {
            key: "9",
            name: "Skyline Tower Suites",
            date: "2025-03-15",
            type: "Hotel",
            status: "Pending",
            location: "New York, New York",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        },
        {
            key: "10",
            name: "Coastal Breeze Villa",
            date: "2025-02-08",
            type: "Villa",
            status: "Verified",
            location: "Santa Monica, California",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
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
                    src={record.image}
                    className="w-16 h-12 object-cover rounded-lg"
                    alt={record.name}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value) => <span className="font-semibold">{value}</span>,
        },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    {type}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Verified"
                        ? "bg-green-100 text-green-700"
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
                        placeholder="Filter by Type"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        allowClear
                        className="w-full md:w-48"
                        size="large"
                        popupMatchSelectWidth={false}
                        dropdownStyle={{ paddingTop: 8, paddingBottom: 8 }}
                        options={[
                            { label: "Apartment", value: "Apartment" },
                            { label: "Resort", value: "Resort" },
                            { label: "Hotel", value: "Hotel" },
                            { label: "Villa", value: "Villa" },
                            { label: "Lodge", value: "Lodge" },
                            { label: "Cabin", value: "Cabin" },
                        ]}
                    />
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
                            { label: "Verified", value: "Verified" },
                            { label: "Pending", value: "Pending" },
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
