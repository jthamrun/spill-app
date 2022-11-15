import React from "react";

function Header() {
  return (
    <header className="flex p-5 bg-base-green space-x-10">
      <h1 className="font-quicksand font-bold text-2xl">spill.</h1>
      <div className="flex space-x-10">
        <h1>Create Expense</h1>
        <h1>Past Expenses</h1>
        <h1>Friends</h1>
        <h1>Search People</h1>
      </div>
    </header>
  );
}

export default Header;
