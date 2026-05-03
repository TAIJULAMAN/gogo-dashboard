import { useState } from "react";
import dayjs from "dayjs";
import TotalView from "./TotalView";
import YearDropdown from "./YearDropdown";

const UserGrowth = () => {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center gap-5 mb-5">
        <h1 className="text-xl text-[#2D8C3C] font-semibold">User Growth</h1>
        <YearDropdown
          value={selectedYear}
          onChange={setSelectedYear}
          open={isOpen}
          setOpen={setIsOpen}
        />
      </div>
      <TotalView year={selectedYear} />
    </div>
  );
};

export default UserGrowth;
