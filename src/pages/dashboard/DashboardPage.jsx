import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import RecentUsers from "./RecentUsers";
import TotalView from "./TotalView";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 2020;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">200K</p>
          <p className="text-xl font-semibold">Total User</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">1200</p>
          <p className="text-xl font-semibold">Total Orders</p>
        </div>
        <div className="flex flex-col justify-center items-center p-8 bg-[#F2F2F2] rounded-xl gap-2">
          <p className="text-[#2D8C3C] text-2xl font-bold">$120000</p>
          <p className="text-xl font-semibold">Total Earnings</p>
        </div>
      </div>

      <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md mt-5">
        <div className="flex flex-row justify-between items-center gap-5 my-5">
          <div>
            <h1 className="text-xl text-[#2D8C3C] font-semibold">User Growth</h1>
          </div>
          <div className="whitespace-nowrap">
            <div className="relative w-full md:w-32">
              {/* Selected Year Display */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-[#2D8C3C] rounded-md flex justify-between items-center bg-white transition"
              >
                <span className="text-[#2D8C3C]">{selectedYear}</span>
                <FaChevronDown className="text-[#2D8C3C] w-5 h-5 ml-5" />
              </button>

              {/* Dropdown List */}
              {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-lg">
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => handleSelect(year)}
                      className={`p-2 cursor-pointer hover:bg-gray-100 transition ${year === selectedYear ? "bg-[#2D8C3C] text-white" : ""
                        }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <TotalView />
      </div>
      <div className="mt-5">
        <h1 className="text-2xl text-[#2D8C3C] font-bold mb-5">Recent Joined User</h1>
        <RecentUsers />
      </div>
    </div>
  );
}

export default DashboardPage;
