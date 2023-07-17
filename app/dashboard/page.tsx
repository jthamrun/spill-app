import React from "react";
import WelcomeCard from "../../components/Dashboard/WelcomeCard";
import FriendsStatsDashboard from "../../components/Dashboard/FriendsStatsDashboard";
import QuickActionsDashboard from "../../components/Dashboard/QuickActionsDashboard";
import QuickStatsDashboard from "../../components/Dashboard/QuickStatsDashboard";
import RecentExpensesDashboard from "../../components/Dashboard/RecentExpensesDashboard";
import { getServerSession } from "next-auth";

async function Dashboard() {
    const session = await getServerSession()

    return (
        <div>
        <div className="px-10 py-5 m-auto overflow-auto flex"><WelcomeCard name={session ? session.user!.name : ""} /></div>
        <div className="h-[92vh] px-10 py-5 grid grid-rows-9 md:grid-cols-3 md:grid-rows-5 gap-4 overflow-auto xl:max-w-5xl m-auto">
            <QuickActionsDashboard />
            <FriendsStatsDashboard />
            <QuickStatsDashboard />
            <RecentExpensesDashboard />
        </div>
        </div>

    );
}

export default Dashboard;
