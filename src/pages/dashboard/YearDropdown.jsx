import { FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";

const YearDropdown = ({ value, onChange, open, setOpen }) => {
  const currentYear = dayjs().year();
  const startYear = 2020;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  return (
    <div className="relative w-28">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border border-[#2D8C3C] rounded-md flex justify-between items-center bg-white transition"
      >
        <span className="text-[#2D8C3C] text-sm font-medium">{value}</span>
        <FaChevronDown className="text-[#2D8C3C] w-4 h-4 ml-2" />
      </button>
      {open && (
        <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-52 overflow-y-auto shadow-lg">
          {years.map((y) => (
            <div
              key={y}
              onClick={() => {
                onChange(y);
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition ${
                y === value ? "bg-[#2D8C3C] text-white" : "text-gray-700"
              }`}
            >
              {y}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
