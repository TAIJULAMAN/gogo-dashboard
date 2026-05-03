import { useState } from "react";
import dayjs from "dayjs";
import RiderGrowthChart from "./RiderGrowthChart";
import YearDropdown from "./YearDropdown";

const RiderGrowth = () => {
  const currentYear = dayjs().year();
  const [riderYear, setRiderYear] = useState(currentYear);
  const [isRiderOpen, setIsRiderOpen] = useState(false);

  return (
    <div className="p-5 bg-[#F2F2F2] rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center gap-5 mb-5">
        <div>
          <h2 className="text-xl text-[#2D8C3C] font-semibold">Rider Growth</h2>
          <p className="text-sm text-gray-500 mt-0.5">Monthly active riders</p>
        </div>
        <YearDropdown
          value={riderYear}
          onChange={setRiderYear}
          open={isRiderOpen}
          setOpen={setIsRiderOpen}
        />
      </div>
      <RiderGrowthChart year={riderYear} />
    </div>
  );
};

export default RiderGrowth;
