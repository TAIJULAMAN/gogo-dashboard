import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Select } from "antd";

export default function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", role: "", clinic: "", email: "", phone: "", joined: "" });

  const save = (e) => {
    e.preventDefault();
    const { fullName, role, clinic, email, phone, joined } = form;
    if (!fullName || !role || !clinic || !email || !phone || !joined) {
      alert("Please fill in all fields");
      return;
    }
    alert(
      "User created successfully (demo)\n\n" +
        JSON.stringify({ fullName, role, clinic, email, phone, joined }, null, 2)
    );
    navigate(-1);
  };

  return (
    <div className="p-5">
      <div className="bg-[#74AA2E] px-4 md:px-5 py-3 rounded-md mb-3 flex flex-wrap items-start md:items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-90 transition"
          aria-label="Go back"
        >
          <IoChevronBack className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl sm:text-2xl font-bold">Create User</h1>
      </div>

      <form onSubmit={save} className="bg-white rounded-md shadow border border-gray-200 p-5">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74AA2E]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
            <Select
              className="w-full"
              placeholder="Select role"
              value={form.role}
              onChange={(val) => setForm({ ...form, role: val })}
              options={[
                { label: "Dentist", value: "Dentist" },
                { label: "Lab Manager", value: "Lab Manager" },
                { label: "Practice Manager", value: "Practice Manager" },
                { label: "Practice Nurse", value: "Practice Nurse" },
                { label: "Lab Technician", value: "Lab Technician" },
                { label: "Blocked", value: "Blocked" },
              ]}
              size="large"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Clinic</label>
            <input
              type="text"
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              placeholder="Downtown Dental Clinic"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74AA2E]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74AA2E]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone No</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 987 654 3210"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74AA2E]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Joined Date</label>
            <input
              type="date"
              value={form.joined}
              onChange={(e) => setForm({ ...form, joined: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74AA2E]"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-[#74AA2E] text-white font-semibold py-3 rounded-md">
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
