import React from "react";

function Dashboard() {
  return (
    <div className="h-[90vh] px-10 py-5 grid grid-rows-9 md:grid-cols-3 md:grid-rows-5 gap-4">
      {/* Quick Actions Module */}
      <div className="border border-black row-span-1 md:col-span-2 md:row-span-2 rounded-md flex flex-col px-4 py-1">
        <h3 className="font-quicksand font-bold text-sm md:text-lg">
          Quick Actions
        </h3>
        <div className="flex h-full">
          <div className="m-auto flex flex-col space-y-2">
            <button className="border border-black rounded-md px-4 py-1 bg-base-green">
              <p className="font-quicksand font-bold">Search People</p>
            </button>
            <button className="border border-black rounded-md px-4 py-1 bg-light-green">
              <p className="font-quicksand font-bold">Create New Expense</p>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Module */}
      <div className="hidden md:grid md:border md:border-black md:row-span-3 rounded-md">
        Test
      </div>

      {/* Friends Module */}
      <div className="border border-black row-span-5 md:col-span-2 md:row-span-1 rounded-md">
        Test
      </div>

      {/* Recent Expenses Module */}
      <div className="border border-black row-span-3 md:col-span-3 md:row-span-2 rounded-md">
        Test
      </div>
    </div>
  );
}

export default Dashboard;
