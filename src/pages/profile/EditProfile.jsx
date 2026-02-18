function EditProfile() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-xl px-4 sm:px-6 md:px-8 py-5 rounded-md border border-gray-200 shadow-sm">
        <p className="text-[#2D8C3C] text-center font-bold text-xl sm:text-2xl mb-5">
          Edit Your Profile
        </p>
        <form className="space-y-4">
          <div>
            <label className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold block">
              User Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold block">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold block">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNo"
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="text-center pt-2">
            <button className="bg-[#2D8C3C] text-white font-semibold w-full py-3 rounded-lg hover:opacity-95 transition">
              Save & Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
