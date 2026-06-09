import { ConfigProvider, List, Button, Tag } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetReportsQuery,
  useResolveReportMutation,
} from "../../../Redux/features/report/reportApi";
import { useState } from "react";

export default function SupportMessages() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: reportsData, isLoading, isFetching } = useGetReportsQuery({
    page,
    limit: 10,
  });
  const [resolveReport, { isLoading: isResolving }] = useResolveReportMutation();

  const items = reportsData?.data?.data || [];
  const total = reportsData?.data?.total || 0;

  const handleResolve = async (id) => {
    try {
      await resolveReport(id).unwrap();
    } catch (error) {
      console.error("Failed to resolve report:", error);
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
            Support Messages
          </h1>
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
            loading={isLoading || isFetching}
            dataSource={items}
            pagination={{
              current: page,
              pageSize: 10,
              total: total,
              onChange: (p) => setPage(p),
              hideOnSinglePage: true,
            }}
            renderItem={(item) => {
              const id = item?._id || item?.id;
              const isResolved = item?.status === "Resolved";
              const reporter = item?.reporter;
              const reporterName = reporter 
                ? `${reporter.firstName || ""} ${reporter.lastName || ""}`.trim() || reporter.name
                : "Unknown User";
              const reporterEmail = reporter?.email || "No email";

              return (
                <div
                  className={`group flex flex-col gap-4 p-5 border border-gray-200 bg-white rounded-lg mb-4 transition hover:shadow-md ${
                    isResolved ? "opacity-75" : ""
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <Tag
                        color={item?.reporterRole === "Rider" ? "blue" : "purple"}
                        className="font-semibold px-2 py-0.5 rounded"
                      >
                        {item?.reporterRole || "User"}
                      </Tag>
                      <h3 className="text-lg font-bold text-[#0D0D0D]">
                        {item?.title || "No Subject"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag
                        color={isResolved ? "success" : "warning"}
                        className="font-semibold px-2 py-0.5 rounded"
                      >
                        {item?.status || "Pending"}
                      </Tag>
                      {item?.createdAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1">
                    {/* Reporter Details */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-700">From:</span> {reporterName}
                      </div>
                      {reporterEmail && (
                        <div>
                          <span className="font-semibold text-gray-700">Email:</span> {reporterEmail}
                        </div>
                      )}
                    </div>
                    {/* Message Description */}
                    <p className="text-[#333] text-base leading-relaxed whitespace-pre-wrap">
                      {item?.description || "No description provided."}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  {!isResolved && (
                    <div className="flex justify-end pt-2 border-t border-gray-50">
                      <Button
                        type="primary"
                        style={{ background: "#2D8C3C", borderColor: "#2D8C3C" }}
                        className="font-semibold rounded-md text-white hover:bg-[#226e2e]"
                        loading={isResolving}
                        onClick={() => handleResolve(id)}
                      >
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </div>
              );
            }}
          />

          {!isLoading && !isFetching && items.length === 0 && (
            <div className="text-center text-gray-500 py-10 bg-white border border-gray-200 rounded-lg">
              No support messages found
            </div>
          )}
        </div>
      </ConfigProvider>
    </div>
  );
}
