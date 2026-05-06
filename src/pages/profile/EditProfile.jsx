import { message } from "antd";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../Redux/features/settings/profileApi";

function EditProfile() {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const profile = profileData?.data || {};
  const fullName = profile?.firstName || profile?.lastName 
    ? `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() 
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const fullNameInput = form.fullName.value.trim();
    const nameParts = fullNameInput.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    
    const phoneNumber = form.contactNo.value;

    const formData = new FormData();
    if (firstName) formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    if (form.email.value) formData.append("email", form.email.value);

    try {
      const res = await updateProfile(formData).unwrap();
      if (res.success) {
        message.success(res.message || "Profile updated successfully");
      }
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-xl px-4 sm:px-6 md:px-8 py-5 rounded-md border border-gray-200 shadow-sm">
        <p className="text-[#2D8C3C] text-center font-bold text-xl sm:text-2xl mb-5">
          Edit Your Profile
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base text-[#2D8C3C] mb-2 font-semibold block">
              User Name
            </label>
            <input
              type="text"
              name="fullName"
              defaultValue={fullName}
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
              defaultValue={profile?.email || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base bg-gray-50 cursor-not-allowed"
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
              defaultValue={profile?.phoneNumber || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none placeholder:text-sm md:placeholder:text-base focus:ring-2 focus:ring-[#74AA2E]"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="text-center pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#2D8C3C] text-white font-semibold w-full py-3 rounded-lg hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save & Change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
