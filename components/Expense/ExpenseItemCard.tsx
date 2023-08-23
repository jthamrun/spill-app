import React, { useEffect, useState } from "react";
import { UsersIcon, ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { ExpenseItemGroup } from "../store/types";
import AddPersonToItemCardModal from "./AddPersonToItemCardModal";

type Props = {
  group?: ExpenseItemGroup;
  itemAmount?: number;
};

function ExpenseItemCard({ group: personGroup, itemAmount }: Props) {
  const [isAddPersonModal, setIsAddPersonModal] = useState(false);
  const [group, setGroup] = useState<ExpenseItemGroup>({
    group_id: "u2131ms",
    item_id: "313sserkr",
    splitOption: "equal",
    splitAmount: [],
  });

  const [equalSplit, setEqualSplit] = useState<boolean>(
    group.splitOption == "equal"
  );

  const setEqualSplitHandler = () => {
    equalSplit
      ? setGroup((prev) => {
          return {
            ...prev,
            splitOption: "individual",
          };
        })
      : setGroup((prev) => {
          return {
            ...prev,
            splitOption: "equal",
            splitAmount:
              prev.splitAmount?.map((user) => {
                return {
                  ...user,
                  total_amount:
                    Math.floor(
                      ((itemAmount ?? 11.99) / prev.splitAmount!.length) * 100
                    ) / 100,
                };
              }) ?? [],
          };
        });

    setEqualSplit((prev) => !prev);
  };

  useEffect(() => {
    console.log("updating group info in database...");
  }, [group]);

  useEffect(() => {
    // update equal amount when the number of users involved in group changes
    console.log("updating equal amount...");

    equalSplit &&
      setGroup((prev) => {
        return {
          ...prev,
          splitAmount:
            prev.splitAmount?.map((user) => {
              return {
                ...user,
                total_amount:
                  Math.floor(
                    ((itemAmount ?? 11.99) / prev.splitAmount!.length) * 100
                  ) / 100,
              };
            }) ?? [],
        };
      });
  }, [group.splitAmount?.length]);

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 flex-wrap gap-1 border border-black p-2 rounded-md bg-white items-center">
        {group?.splitAmount?.map((splitItem) => (
          <p className="border border-black rounded-xl px-2 py-1 bg-base-green font-quicksand font-bold">
            {splitItem.name
              .split(" ")
              .map((name) => name.charAt(0))
              .join("")}{" "}
            - ${splitItem.total_amount}
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
          <UsersIcon className="h-5" />
        </button>
        {/* <button className="border border-black p-2  rounded-md bg-error-red">
          <UserMinusIcon className="h-5" />
        </button> */}
        <button
          onClick={setEqualSplitHandler}
          className={`border border-black p-2  rounded-md ${
            equalSplit ? "bg-base-green" : "bg-white"
          }`}
        >
          <ArrowsRightLeftIcon className="h-5" />
        </button>
      </div>

      {isAddPersonModal && (
        <AddPersonToItemCardModal
          isOpen={isAddPersonModal}
          setOn={setIsAddPersonModal}
          group={group}
          setGroup={setGroup}
        />
      )}
    </div>
  );
}

export default ExpenseItemCard;
