import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

export default function Settings() {
  return (
    <div className="w-full mx-auto">
      {/* Card */}
      <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2D8C3C] px-5 py-3">
          <h1 className="text-white text-2xl font-bold">Settings</h1>
        </div>

        {/* List */}
        <ul className="divide-y divide-gray-200">
          {/* Edit Profile */}
          <li>
            <Link
              to="/profile"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-base">Edit Profile</span>
              <IoChevronForward className="text-gray-500" />
            </Link>
          </li>
          {/* Privacy Policy */}
          <li>
            <Link
              to="/privacy-policy"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-base">Privacy Policy</span>
              <IoChevronForward className="text-gray-500" />
            </Link>
          </li>
          {/* Terms & Conditions */}
          <li>
            <Link
              to="/terms-and-condition"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-base">
                Terms & Conditions
              </span>
              <IoChevronForward className="text-gray-500" />
            </Link>
          </li>
          {/* About Us */}
          <li>
            <Link
              to="/about-us"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 text-base">About Us</span>
              <IoChevronForward className="text-gray-500" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
