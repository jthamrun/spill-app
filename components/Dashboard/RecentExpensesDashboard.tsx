import React from "react";
import RecentExpensesRow from "./RecentExpensesRow";

function RecentExpensesDashboard() {
  return (
    <div className="border border-black row-span-2 md:col-span-3 md:row-span-2 rounded-md px-4 py-1 flex flex-col">
      <h3 className="font-quicksand font-bold text-sm md:text-lg">
        Recent Expenses
      </h3>
      <div className="flex h-full">
        <table className="m-auto w-full text-center border border-black">
          <thead className="bg-base-green border-y border-black">
            <tr>
              <th>Expense Date</th>
              <th>Expense Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <RecentExpensesRow />
            <RecentExpensesRow />
            <RecentExpensesRow />
            <RecentExpensesRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentExpensesDashboard;
