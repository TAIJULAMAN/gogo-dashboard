import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { IoChevronBack } from "react-icons/io5";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto">
      <div className="h-full">
        <div className="bg-[#2D8C3C] px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-2 md:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-90 transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row justify-center items-center bg-[#2D8C3C] mt-5 text-white w-full max-w-3xl mx-auto p-4 md:p-5 gap-4 md:gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  alt="profile"
                  className="h-30 w-32 rounded-full"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#575757]" />
                  </label>
                  <input type="file" id="profilePicUpload" className="hidden" />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg sm:text-xl md:text-3xl font-bold">Shah Aman</p>
              <p className="text-base sm:text-lg font-semibold">Admin</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm sm:text-base md:text-xl font-semibold my-4 md:my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer px-3 py-1 rounded-md pb-1 ${activeTab === "editProfile"
                ? "text-[#2D8C3C] border-b-2 border-[#2D8C3C]"
                : "text-[#6A6D76]"
                }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer px-3 py-1 rounded-md pb-1 ${activeTab === "changePassword"
                ? "text-[#2D8C3C] border-b-2 border-[#2D8C3C]"
                : "text-[#6A6D76]"
                }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
