/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import {
  MdOutlineInventory2,
  MdList,
  MdLocalOffer,
} from "react-icons/md";

const navItems = [
  { path: "/", label: "Dashboard", icon: RxDashboard },
  { path: "/user-details", label: "User Management", icon: LuUsers },
  { path: "/earnings", label: "Earnings", icon: MdOutlineInventory2 },
  { path: "/order-management", label: "Order Management", icon: MdList },
  { path: "/transactions", label: "Transactions", icon: MdLocalOffer },
  { path: "/settings", label: "Settings", icon: IoMdSettings },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`bg-sidebar text-white h-screen overflow-y-auto py-5 md:py-0 z-50 transition-transform
        w-[80%] sm:w-[70%] md:w-[60%] lg:w-60 xl:w-72
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        fixed top-0 left-0
        lg:static lg:translate-x-0
      `}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-sidebar bg-primary focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>

      {/* Logo */}
      <div className="flex justify-center items-center gap-2 px-5 mt-20">
        <span className="text-5xl font-bold text-primary">GOGO</span>
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-10 px-5 text-[10px]">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link to={path} key={path} onClick={handleItemClick}>
            <li
              className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ease-in-out rounded-lg px-3 py-3 mt-2
                ${isActive(path)
                  ? "bg-primary text-sidebar font-bold shadow-lg shadow-primary/20"
                  : "text-white/70 hover:bg-sidebar-hover hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5" />
              <p className="text-base font-semibold">{label}</p>
            </li>
          </Link>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-8 md:mt-20 w-full px-5">
        <Link to="/sign-in">
          <button className="flex items-center gap-4 w-full py-3 rounded-lg bg-primary-dark hover:bg-primary-darker px-3 duration-300 text-white justify-center font-semibold transition-colors">
            <IoLogOutOutline className="w-5 h-5 font-bold" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
