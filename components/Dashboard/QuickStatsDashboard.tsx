import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function QuickStatsDashboard() {
  return (
    <div className="hidden md:grid md:border md:border-black md:col-span-2 md:row-span-1 rounded-md font-quicksand font-medium">
      <div className="flex justify-between p-4 items-center xl:px-8">
        <h3 className="font-bold">
          Last <br />
          30 days
        </h3>
        <ChevronDownIcon className="h-5" />
        <h3 className="">
          Expenses <br />
          <span className="font-bold">38</span>
        </h3>
        <div className="w-[1px] bg-black h-1/2"></div>
        <h3>
          New Friends <br />
          <span className="font-bold">0</span>
        </h3>
        <div className="w-[1px] bg-black h-1/2"></div>
        <h3>
          Expenditure <br />
          <span className="font-bold">$2,500</span>
        </h3>
      </div>
    </div>
  );
}

export default QuickStatsDashboard;
