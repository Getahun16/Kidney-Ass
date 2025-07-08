import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-lime-900 mb-8">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Visitors" value="1,245" />
        <DashboardCard title="Active Users" value="214" />
        <DashboardCard title="Published Blogs" value="12" />
      </div>
    </div>
  );
}
