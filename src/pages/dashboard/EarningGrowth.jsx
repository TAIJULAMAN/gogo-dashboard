import { useState } from "react";
import dayjs from "dayjs";
import EarningGrowthChart from "./EarningGrowthChart";
import YearDropdown from "./YearDropdown";

const EarningGrowth = () => {
  const currentYear = dayjs().year();
  const [earningYear, setEarningYear] = useState(currentYear);
  const [isEarningOpen, setIsEarningOpen] = useState(false);

  return (
    <div className="p-5 bg-[#F2F2F2] rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center gap-5 mb-5">
        <div>
          <h2 className="text-sm md:text-xl text-[#2D8C3C] font-semibold">
            Earning Growth
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Monthly revenue ($)</p>
        </div>
        <YearDropdown
          value={earningYear}
          onChange={setEarningYear}
          open={isEarningOpen}
          setOpen={setIsEarningOpen}
        />
      </div>
      <EarningGrowthChart year={earningYear} />
    </div>
  );
};

export default EarningGrowth;
