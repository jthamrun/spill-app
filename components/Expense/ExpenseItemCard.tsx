import React, { useState } from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/20/solid";
import { ExpenseItemGroup } from "../store/types";
import AddPersonToItemCardModal from "./AddPersonToItemCardModal";

type Props = {
  group?: ExpenseItemGroup;
};

function ExpenseItemCard({ group }: Props) {
  const [isAddPersonModal, setIsAddPersonModal] = useState(false);

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 flex-wrap gap-1 border border-black p-2 rounded-md bg-white items-center">
        {group?.splitAmount?.map((splitItem) => (
          <p className="border border-black rounded-xl px-2 py-1 bg-base-green font-quicksand font-bold">
            {splitItem.user_id} - ${splitItem.total_amount}
            {/* will use user_id for now */}
          </p>
        ))}
        <p className="border border-black rounded-xl px-2 py-1 bg-base-green font-quicksand font-bold">
          JT
        </p>
        <p className="border border-black rounded-xl px-2 py-1 bg-base-green font-quicksand font-bold">
          JS
        </p>
      </div>

      <div className="flex space-x-1">
        <button
          className="border border-black p-2  rounded-md bg-light-green"
          onClick={() => setIsAddPersonModal(true)}
        >
          <UserPlusIcon className="h-5" />
        </button>
        <button className="border border-black p-2  rounded-md bg-error-red">
          <UserMinusIcon className="h-5" />
        </button>
      </div>

      {isAddPersonModal && (
        <AddPersonToItemCardModal
          isOpen={isAddPersonModal}
          setOn={setIsAddPersonModal}
        />
      )}
    </div>
  );
}

export default ExpenseItemCard;
