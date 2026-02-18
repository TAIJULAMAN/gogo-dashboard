import { useState } from "react";
import { ConfigProvider, List, Button } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      title: "New user registered",
      time: "2m ago",
      read: false,
      description:
        "A new dentist account has been created and is awaiting verification.",
    },
    {
      id: 2,
      title: "Case #123 has been updated",
      time: "10m ago",
      read: false,
      description: "Lab Technician updated the case status to 'In Production'.",
    },
    {
      id: 3,
      title: "Weekly report is ready",
      time: "1h ago",
      read: true,
      description:
        "Your weekly engagement and growth report is now available for review.",
    },
    {
      id: 4,
      title: "Clinic profile approved",
      time: "3h ago",
      read: false,
      description:
        "Smile Care Clinic has been approved and is now visible to users.",
    },
  ]);

  const markRead = (id, read = true) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read } : i)));
  };
  const markAllRead = () =>
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  return (
    <div className="min-h-screen">
      <div className="bg-[#2D8C3C] px-4 py-3 rounded-md mb-5 flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-white flex flex-row items-center gap-2"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            Notifications
          </h1>
        </div>
        <div>
          <Button onClick={markAllRead} size="small">
            Mark all read
          </Button>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            List: {
              colorPrimary: "#2D8C3C",
            },
          },
        }}
      >
        <div className="bg-transparent">
          <List
            split={false}
            dataSource={items}
            renderItem={(item) => (
              <div
                onClick={() => !item.read && markRead(item.id, true)}
                className={`group flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-lg mb-3 transition hover:shadow-sm cursor-pointer ${item.read ? "opacity-90" : ""
                  }`}
              >
                {/* Unread Accent Bar */}
                <div
                  className={`w-1 rounded-full self-stretch ${item.read ? "bg-transparent" : "bg-[#2D8C3C]"
                    }`}
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base md:text-lg font-semibold text-[#0D0D0D]">
                      {item.title}
                    </h4>
                    <span className="text-xs md:text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full shrink-0">
                      {item.time}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-1 pr-2">
                      {item.description}
                    </p>
                  )}
                  {!item.read && (
                    <p className="text-[12px] text-[#2D8C3C] mt-1">New</p>
                  )}
                </div>

                {/* Actions (show on hover) */}
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.read ? (
                    <Button
                      size="small"
                      onClick={() => markRead(item.id, false)}
                    >
                      Mark unread
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      type="primary"
                      style={{ background: "#2D8C3C" }}
                      onClick={() => markRead(item.id, true)}
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              </div>
            )}
          />
          {items.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No notifications
            </div>
          )}
        </div>
      </ConfigProvider>
    </div>
  );
}
