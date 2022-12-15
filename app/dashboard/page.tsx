import React from "react";
import FriendsStatsDashboard from "../../components/Dashboard/FriendsStatsDashboard";
import QuickActionsDashboard from "../../components/Dashboard/QuickActionsDashboard";
import QuickStatsDashboard from "../../components/Dashboard/QuickStatsDashboard";
import RecentExpensesDashboard from "../../components/Dashboard/RecentExpensesDashboard";

function Dashboard() {
  return (
    <div className="h-[90vh] px-10 py-5 grid grid-rows-9 md:grid-cols-3 md:grid-rows-5 gap-4 overflow-auto">
      <QuickActionsDashboard />
      <FriendsStatsDashboard />
      <QuickStatsDashboard />
      <RecentExpensesDashboard />
    </div>
  );
}

export default Dashboard;
