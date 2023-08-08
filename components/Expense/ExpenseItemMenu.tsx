import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import ExpenseItemMenuCard from "./ExpenseItemMenuCard";

function ExpenseItemMenu() {
  const [itemField, setItemField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [quantityField, setQuantityField] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex flex-1 space-x-2">
        <div className="flex grow shrink-0 items-center p-2 h-10 rounded-md pace-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
          <input
            className="font-quicksand text-black focus:outline-none w-full"
            type="text"
            placeholder="Enter Item"
            value={itemField}
            onChange={(e) => {
              setItemField(e.target.value);
            }}
          />
        </div>
        <div className="flex shrink items-center p-2 h-10 rounded-md pace-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
          <input
            className="font-quicksand text-black focus:outline-none w-full text-xs min-[900px]:text-base"
            type="text"
            placeholder="Price"
            value={priceField}
            onChange={(e) => {
              setPriceField(e.target.value);
            }}
          />
        </div>
        <div className="flex shrink items-center p-2 h-10 rounded-md pace-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
          <input
            className="font-quicksand text-black focus:outline-none w-full text-xs min-[900px]:text-base"
            type="text"
            placeholder="Quantity"
            value={quantityField}
            onChange={(e) => {
              setQuantityField(e.target.value);
            }}
          />
        </div>
        <button className="border border-black rounded-md p-2">
          <PlusCircleIcon className="h-5" />
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <ExpenseItemMenuCard />
        <ExpenseItemMenuCard />
        <ExpenseItemMenuCard />
      </div>
    </div>
  );
}

export default ExpenseItemMenu;
