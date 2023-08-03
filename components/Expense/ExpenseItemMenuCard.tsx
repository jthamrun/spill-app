import {
  BarsArrowDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import React from "react";

function ExpenseItemMenuCard() {
  return (
    <div className="mt-4 flex items-center justify-between border border-black rounded-md p-3">
      <p className="font-quicksand font-bold">Dumpling Tofu Soup</p>
      <div className="flex items-center space-x-8">
        <p className="font-quicksand font-bold">$11.99</p>
        <BarsArrowDownIcon className="h-5" />
        <EllipsisVerticalIcon className="h-5" />
      </div>
    </div>
  );
}

export default ExpenseItemMenuCard;
