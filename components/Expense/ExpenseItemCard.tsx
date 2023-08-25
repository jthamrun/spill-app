import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  UsersIcon,
  ArrowsRightLeftIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import { ExpenseItemGroup } from "../store/types";
import AddPersonToItemCardModal from "./AddPersonToItemCardModal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

type Props = {
  group?: ExpenseItemGroup;
  itemAmount?: number;
  currentUser: string;
  creatorId: string;
};

function ExpenseItemCard({
  group: personGroup,
  itemAmount,
  currentUser,
  creatorId,
}: Props) {
  const didRender = useRef<boolean>(false);
  const [isAddPersonModal, setIsAddPersonModal] = useState(false);
  const [group, setGroup] = useState<ExpenseItemGroup>(personGroup!);

  const [isGroupEdited, setIsGroupEdited] = useState<boolean>(false);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);
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

  const updateGroupInFirestore = async () => {
    try {
      setLoadingSpinner(true);

      await setDoc(
        doc(db, "expense-item-groups", group.group_id as string),
        {
          splitAmount: group.splitAmount,
          splitOption: group.splitOption,
        },
        {
          merge: true,
        }
      );
    } catch (err) {
    } finally {
      setLoadingSpinner(false);
      setIsGroupEdited(false);
    }
  };

  useEffect(() => {
    // if any changes occur to group, set isGroupEdited to true

    // if(!didRender.current) {
    //   didRender.current = true;
    // } else {
    //   !isGroupEdited && setIsGroupEdited(true);
    // }

    // for now, this works, but it is not recommended to use cleanup for doing the work
    // in production, useEffect doesn't run twice, therefore, we can remove this cleanup function later
    return () => {
      if (!didRender.current) {
        didRender.current = true;
      } else {
        !isGroupEdited && setIsGroupEdited(true);
      }
    };
  }, [group.splitAmount, group.splitOption]);

  useEffect(() => {
    // update equal amount when the number of users involved in group changes

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
      <div
        className={`flex flex-1 flex-wrap gap-1 border border-black p-2 rounded-md bg-white items-center ${
          group.splitAmount!.length == 0 ? "h-12" : ""
        }`}
      >
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
      </div>

      {creatorId === currentUser ? (
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
          <button
            onClick={updateGroupInFirestore}
            disabled={!isGroupEdited}
            className="border border-black p-2 rounded-md bg-white"
          >
            {loadingSpinner ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <ArrowPathIcon />
              </svg>
            ) : (
              <CheckBadgeIcon className="h-5" />
            )}
          </button>
        </div>
      ) : (
        <div className="flex space-x-1">
          <button className="border border-black p-2  rounded-md bg-light-green">
            <UserPlusIcon className="h-5" />
          </button>
          <button className="border border-black p-2  rounded-md bg-error-red">
            <UserMinusIcon className="h-5" />
          </button>
        </div>
      )}

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
