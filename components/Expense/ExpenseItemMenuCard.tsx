import {
  BarsArrowDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import ExpenseItemCard from "./ExpenseItemCard";
import ExpenseItemDropdown from "./ExpenseItemDropdown";

function ExpenseItemMenuCard() {
  const [isDetailedItem, setIsDetailedItem] = useState(false);
  const [isItemDropdown, setIsItemDropdown] = useState(false);
  const itemDetail = useRef<HTMLInputElement>(null);
  //const itemDropdown = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isDetailedItem) return;
    function handleClick(event: any) {
      if (itemDetail.current && !itemDetail.current.contains(event.target)) {
        setIsDetailedItem(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isDetailedItem]);

  return (
    <div ref={itemDetail} className="relative">
      <div
        className={`flex items-center justify-between border border-black rounded-md p-3 hover:bg-base-green duration-150 ${
          isDetailedItem ? "bg-base-green" : "bg-white"
        }`}
      >
        <p className="font-quicksand font-bold">Dumpling Tofu Soup</p>
        <div className="flex items-center space-x-8">
          <p className="font-quicksand font-bold">$11.99</p>
          <button onClick={() => setIsDetailedItem(!isDetailedItem)}>
            <BarsArrowDownIcon className="h-5" />
          </button>
          <button onClick={() => setIsItemDropdown(!isItemDropdown)}>
            <EllipsisVerticalIcon className="h-5" />
          </button>
        </div>
      </div>
      {isDetailedItem && (
        <div className="flex flex-col space-y-1 border border-black p-2 rounded-md bg-light2-green mt-1">
          <ExpenseItemCard />
          <ExpenseItemCard />
        </div>
      )}

      {isItemDropdown && (
        <div className="absolute right-0 mt-0.5 z-10 border border-black bg-base-green rounded-md">
          <div className="flex flex-col p-3 space-y-2">
            <button className="hover:bg-white rounded-md duration-150 px-2">
              <p className="font-quicksand font-bold">Edit</p>
            </button>
            <button className="hover:bg-white rounded-md duration-150 px-2">
              <p className="font-quicksand font-bold">Delete</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseItemMenuCard;
