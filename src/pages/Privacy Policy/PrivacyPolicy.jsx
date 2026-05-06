import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoChevronBack } from "react-icons/io5";
import { message } from "antd";
import { useGetCommonQuery, useUpdateCommonMutation } from "../../../Redux/features/settings/commonApi";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { data: commonData, isLoading } = useGetCommonQuery();
  const [updateCommon, { isLoading: isUpdating }] = useUpdateCommonMutation();

  useEffect(() => {
    if (commonData?.data?.privacyPolicy) {
      setContent(commonData.data.privacyPolicy);
    }
  }, [commonData]);

  const handleSave = async () => {
    try {
      const res = await updateCommon({ privacyPolicy: content }).unwrap();
      if (res.success) {
        message.success(res.message || "Privacy Policy updated successfully");
      }
    } catch (err) {
      message.error(err?.data?.message || "Failed to update Privacy Policy");
    }
  };

  return (
    <div>
      <div className="bg-[#2D8C3C] px-5 py-3 rounded-md mb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Privacy Policy</h1>
      </div>

      <div className=" bg-white rounded shadow p-5 h-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            Loading...
          </div>
        )}
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="text-center py-5 w-full">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-[#2D8C3C] text-white font-semibold w-full py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}


