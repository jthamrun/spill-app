import React from "react";

function PersonProfileExpense() {
  return (
    <div className="flex flex-col border border-black rounded-md py-2 px-4 hover:bg-black group duration-150">
      <p className="font-bold font-quicksand group-hover:text-white">BCD</p>

      <div className="pt-8">
        <p className="font-quicksand text-expense-gray group-hover:text-nav-gray">
          07/29/2023
        </p>
        <p className="font-quicksand font-bold text-xl group-hover:text-white">
          $11.22
        </p>
      </div>
    </div>
  );
}

export default PersonProfileExpense;
