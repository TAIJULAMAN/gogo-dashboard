import DashboardStats from "./DashboardStats";
import UserGrowth from "./UserGrowth";
import RiderGrowth from "./RiderGrowth";
import EarningGrowth from "./EarningGrowth";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <DashboardStats />
      <UserGrowth />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RiderGrowth />
        <EarningGrowth />
      </div>
    </div>
  );
}

export default DashboardPage;
