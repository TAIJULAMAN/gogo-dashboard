import { ConfigProvider, List, Button } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetAllNotificationQuery,
  useUpdateSingleNotificationMutation,
  useUpdateAllNotificationMutation,
} from "../../../Redux/features/notification/notificationApi";

export default function Notifications() {
  const navigate = useNavigate();

  const { data: notificationsData, isLoading } = useGetAllNotificationQuery();
  const [updateSingleNotification] = useUpdateSingleNotificationMutation();
  const [updateAllNotification] = useUpdateAllNotificationMutation();

  const items = Array.isArray(notificationsData?.data)
    ? notificationsData.data
    : Array.isArray(notificationsData?.data?.result)
    ? notificationsData.data.result
    : [];

  const markRead = async (id, read = true) => {
    if (!read) return; // Assuming the API only supports marking as read
    try {
      await updateSingleNotification(id).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const markAllRead = async () => {
    try {
      await updateAllNotification().unwrap();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };
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
            loading={isLoading}
            renderItem={(item) => {
              const id = item?._id || item?.id;
              const isRead = item?.read ?? item?.isRead ?? false;
              const title = item?.title || item?.message || "Notification";
              const time = item?.createdAt
                ? new Date(item.createdAt).toLocaleString()
                : item?.time;
              const description =
                item?.description ||
                (item?.title && item?.message ? item.message : "");

              return (
                <div
                  onClick={() => !isRead && markRead(id, true)}
                  className={`group flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-lg mb-3 transition hover:shadow-sm cursor-pointer ${
                    isRead ? "opacity-90" : ""
                  }`}
                >
                  {/* Unread Accent Bar */}
                  <div
                    className={`w-1 rounded-full self-stretch ${
                      isRead ? "bg-transparent" : "bg-[#2D8C3C]"
                    }`}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base md:text-lg font-semibold text-[#0D0D0D]">
                        {title}
                      </h4>
                      {time && (
                        <span className="text-xs md:text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full shrink-0">
                          {time}
                        </span>
                      )}
                    </div>
                    {description && (
                      <p className="text-gray-600 text-sm mt-1 pr-2">
                        {description}
                      </p>
                    )}
                    {!isRead && (
                      <p className="text-[12px] text-[#2D8C3C] mt-1">New</p>
                    )}
                  </div>

                  {/* Actions (show on hover) */}
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isRead ? (
                      <Button size="small" disabled>
                        Read
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        type="primary"
                        style={{ background: "#2D8C3C" }}
                        onClick={() => markRead(id, true)}
                      >
                        Mark read
                      </Button>
                    )}
                  </div>
                </div>
              );
            }}
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
