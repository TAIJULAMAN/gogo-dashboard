import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white w-full max-w-xl mx-auto px-4 sm:px-6 md:px-8 pt-8 py-5 rounded-md border border-gray-200 shadow-sm">
      <p className="text-[#2D8C3C] text-center font-bold text-xl sm:text-2xl mb-5">
        Change Password
      </p>
      <form className="space-y-4">
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full border border-gray-300 rounded-md outline-none px-4 py-3 placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-center pt-2">
          <button className="bg-[#2D8C3C] text-white font-semibold w-full py-3 rounded-md hover:opacity-95 transition">
            Save & Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
