import { LinkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ExpenseItemMenu from "./ExpenseItemMenu";

const EditExpenseComponent = () => {
  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 min-[900px]:space-y-0 min-[900px]:space-x-10 min-[900px]:flex-row min-[900px]:justify-center h-[92vh]">
      <div className="flex flex-col min-[900px]:mx-0 space-y-4 self-center min-[900px]:self-auto">
        <div className="border border-black rounded-md">
          <div className="flex py-4 space-x-10 justify-center min-[900px]:px-16">
            <h1 className="font-quicksand font-bold">BCD</h1>
            <p>08/02/2023</p>
          </div>
          <div className="h-[1px] bg-black w-full"></div>
          <div className="py-6 flex space-x-10 justify-center min-[900px]:px-16">
            <p className="font-quicksand font-bold">$123.43</p>
            <p className="font-quicksand font-medium">
              <span className="font-bold">11</span>Friends
            </p>
          </div>
        </div>

        <div className="flex items-center self-center space-x-2">
          <button className="bg-base-green p-2 rounded-md border border-black">
            <p className="font-quicksand font-bold">Breakdown</p>
          </button>
          <button className="bg-base-green py-2 px-6 rounded-md border border-black">
            <p className="font-quicksand font-bold">Verify</p>
          </button>
          <button className="h-full bg-base-green border border-black rounded-md py-2 px-3">
            <PencilIcon className="h-5" />
          </button>

          <button className="h-full bg-base-green border border-black rounded-md py-2 px-3">
            <LinkIcon className="h-5" />
          </button>
        </div>
      </div>

      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 m-auto">
        <ExpenseItemMenu />
      </div>
    </div>
  );
};

export default EditExpenseComponent;
