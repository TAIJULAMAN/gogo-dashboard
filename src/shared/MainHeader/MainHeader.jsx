/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { IoMenu, IoNotificationsOutline } from "react-icons/io5";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full px-5">
      <header className="shadow-sm rounded-lg border border-primary-light/60 overflow-hidden bg-white">
        <div className="flex justify-between items-center px-5 md:px-10 h-[80px]">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded-lg focus:outline-none transition-all duration-5000 ease-in-out"
          >
            <IoMenu className="w-8 h-8 text-[#0D0D0D]" />
          </button>
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full border border-primary-dark/30 hover:bg-primary-ultralight transition-colors"
            >
              <IoNotificationsOutline className="w-6 h-6 text-[#0D0D0D]" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-dark text-white text-[10px] px-1 leading-none font-semibold">3</span>
            </button>
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-default"
            >
              <img
                src="/avatar.png"
                className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full ring-2 ring-primary/50"
                alt="User Avatar"
              />
              <div className="hidden md:block">
                <h3 className="text-[#0D0D0D] text-lg font-semibold">
                  Shah Aman
                </h3>
                <p className="text-primary-dark text-sm font-medium">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
