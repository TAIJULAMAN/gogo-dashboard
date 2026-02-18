import { ConfigProvider, Table } from "antd";


const RecentUsers = () => {
  const dataSource = [
    {
      key: "1",
      fullName: "John Doe",
      role: "Dentist",
      clinic: "Downtown Dental Clinic",
      email: "john@example.com",
      phone: "+1 987 654 3210",
      joined: "2024-01-12",
    },
    {
      key: "2",
      fullName: "Emma Smith",
      role: "Practice Nurse",
      clinic: "Smile Care Clinic",
      email: "emma@example.com",
      phone: "+1 987 654 3211",
      joined: "2024-03-28",
    },
    {
      key: "3",
      fullName: "Liam Johnson",
      role: "Practice Manager",
      clinic: "Healthy Teeth Clinic",
      email: "liam@example.com",
      phone: "+1 987 654 3212",
      joined: "2024-06-15",
    },
    {
      key: "4",
      fullName: "Olivia Brown",
      role: "Lab Technician",
      clinic: "City Dental Center",
      email: "olivia@example.com",
      phone: "+1 987 654 3213",
      joined: "2024-08-02",
    },
    {
      key: "5",
      fullName: "Noah Davis",
      role: "Lab Manager",
      clinic: "Prime Smiles",
      email: "noah@example.com",
      phone: "+1 987 654 3214",
      joined: "2024-09-10",
    },
  ];

  const columns = [
    {
      title: "No",
      key: "no",
      width: 70,
      render: (_, _r, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record.key}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span className="leading-none">{value}</span>
        </div>
      ),
    },
    // { title: "Role", dataIndex: "role", key: "role" },
    // { title: "Clinic", dataIndex: "clinic", key: "clinic" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phone", key: "phone" },
    { title: "Joined Date", dataIndex: "joined", key: "joined" },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#00c0b5",
            },

            Table: {
              headerBg: "#2D8C3C",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#2D8C3C",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </>
  );
};

export default RecentUsers;
