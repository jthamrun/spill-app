import React from "react";

function QuickActionsDashboard() {
  return (
    <div className="border border-black row-span-2 md:col-span-2 md:row-span-2 rounded-md flex flex-col px-4 py-1">
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
  );
}

export default QuickActionsDashboard;
