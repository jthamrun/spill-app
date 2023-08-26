import {
  BarsArrowDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import React, { useContext, useEffect, useRef, useState } from "react";
import ExpenseItemCard from "./ExpenseItemCard";
import EditExpenseItemModal from "./EditExpenseItemModal";
import {
  ExpenseItem,
  ExpenseItemGroup,
  UserExpenseGroup,
} from "../store/types";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase.config";
import LoadingContext from "../store/loading-context/loading-context";
import DeleteExpenseItemMenuCardModal from "./DeleteExpenseItemMenuCardModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addExpenseItemGroup,
  selectExpenseItemGroups,
  updateExpenseItemGroup,
} from "../store/expenses/expenseSlice";

type Props = {
  item?: ExpenseItem;
  onDelete?: (_: ExpenseItem) => Promise<void>;
  currentUser: string;
  creatorId: string;
};

function ExpenseItemMenuCard({
  item,
  onDelete,
  currentUser,
  creatorId,
}: Props) {
  const { showLoader, hideLoader } = useContext(LoadingContext);
  const [isDetailedItem, setIsDetailedItem] = useState(false);
  const [isItemDropdown, setIsItemDropdown] = useState(false);
  const [
    isDeleteExpenseItemMenuCardModal,
    setIsDeleteExpenseItemMenuCardModal,
  ] = useState(false);
  const [isDeleteExpenseItemMenuCard, setIsDeleteExpenseItemMenuCard] =
    useState(false);
  //const itemDetail = useRef<HTMLInputElement>(null);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [groups, setGroups] = useState<ExpenseItemGroup[]>([]);

  const expenseItemGroups = useAppSelector(selectExpenseItemGroups);
  const dispatch = useAppDispatch();

  const getExpenseItemGroups = async () => {
    showLoader();
    try {
      let groupList: ExpenseItemGroup[] = [];
      item?.groups.forEach(async (group_id: string) => {
        if (expenseItemGroups.some((group) => group.group_id === group_id)) {
          groupList.push(
            expenseItemGroups.find((group) => group.group_id === group_id)!
          );
        } else {
          const groupSnap = await getDoc(
            doc(db, "expense-item-groups", group_id)
          );
          if (groupSnap.exists()) {
            const groupData = groupSnap.data();
            const expenseItemGroup = {
              group_id: groupSnap.id,
              item_id: groupData.item_id,
              splitOption: groupData.splitOption,
              splitAmount: (groupData.splitAmount ?? []) as UserExpenseGroup[],
            } as ExpenseItemGroup;
            groupList.push(expenseItemGroup);
            dispatch(addExpenseItemGroup(expenseItemGroup));
          }
        }
      });
      setGroups(groupList);
    } catch (err) {
    } finally {
      setTimeout(() => hideLoader(), 1000);
    }
  };

  const updateExpenseItemGroups = (snap: QuerySnapshot<DocumentData>) => {
    showLoader();
    try {
      const groupsArray: ExpenseItemGroup[] = groups;
      snap.forEach((doc) => {
        const group_data = doc.data();
        const expenseItemGroup = {
          group_id: doc.id,
          item_id: group_data.item_id,
          splitOption: group_data.splitOption,
          splitAmount: (group_data.splitAmount ?? []) as UserExpenseGroup[],
        } as ExpenseItemGroup;
        groupsArray.splice(
          groupsArray.findIndex((group) => group.group_id === doc.id),
          1,
          expenseItemGroup
        );
        dispatch(updateExpenseItemGroup(expenseItemGroup));
      });
      setGroups(groupsArray);
    } catch (err) {
    } finally {
      setTimeout(() => hideLoader(), 1000);
    }
  };

  useEffect(() => {
    getExpenseItemGroups();

    const unsub_expense_item_groups = onSnapshot(
      query(
        collection(db, "expense-item-groups"),
        where("item_id", "==", item?.item_id ?? "")
      ),
      (snapshot) => {
        updateExpenseItemGroups(snapshot);
      }
    );

    return () => {
      unsub_expense_item_groups();
    };
  }, []); // when component initally mounted

  useEffect(() => {
    if (isDeleteExpenseItemMenuCard) {
      onDelete!(item!);
      setIsDeleteExpenseItemMenuCard(false);
      setIsDeleteExpenseItemMenuCardModal(false);
      setIsItemDropdown(false);
    }
  }, [isDeleteExpenseItemMenuCard]);

  // useEffect(() => {
  //   // only add the event listener when the dropdown is opened
  //   if (!isDetailedItem && !isItemDropdown) return;
  //   function handleClick(event: any) {
  //     if (itemDetail.current && !itemDetail.current.contains(event.target)) {
  //       setIsDetailedItem(false);
  //       setIsItemDropdown(false);
  //     }
  //   }
  //   window.addEventListener("click", handleClick);
  //   // clean up
  //   return () => window.removeEventListener("click", handleClick);
  // }, [isDetailedItem, isItemDropdown]);

  return (
    <>
      {(isDetailedItem == true || isItemDropdown == true) && (
        <div
          className="absolute top-0 left-0 w-screen h-screen opacity-50"
          onClick={() => {
            setIsDetailedItem(false);
            setIsItemDropdown(false);
          }}
        />
      )}
      <div className="relative pt-2">
        <div
          className={`flex items-center justify-between border border-black rounded-md p-3 hover:bg-base-green duration-150 ${
            isDetailedItem ? "bg-base-green" : "bg-white"
          }`}
          onClick={() => setIsDetailedItem(!isDetailedItem)}
        >
          <p className="font-quicksand font-bold">
            {item?.name ?? "Dumpling Tofu Soup"}
          </p>
          <div className="flex items-center space-x-8">
            <p className="font-quicksand font-bold">
              ${item?.amount ?? "11.99"}
            </p>
            <button>
              <BarsArrowDownIcon className="h-5" />
            </button>
            <button
              onClick={(e) => {
                setIsItemDropdown(!isItemDropdown);
                e.stopPropagation();
              }}
            >
              <EllipsisVerticalIcon className="h-5" />
            </button>
          </div>
        </div>
        {isDetailedItem && (
          <div className="flex flex-col space-y-1 border border-black p-2 rounded-md bg-light2-green mt-1">
            {groups.map((group) => (
              <ExpenseItemCard
                key={group.group_id}
                group={group}
                itemAmount={item?.amount}
                currentUser={currentUser}
                creatorId={creatorId}
              />
            ))}
            {/* <ExpenseItemCard currentUser={currentUser} creatorId={creatorId} />
            <ExpenseItemCard currentUser={currentUser} creatorId={creatorId} /> */}
          </div>
        )}

        {isItemDropdown && (
          <div
            className={`absolute right-0 mt-0.5 z-10 border border-black bg-base-green rounded-md ${
              isDetailedItem ? "-mt-[127px]" : ""
            }`}
          >
            <div className="flex flex-col p-3 space-y-2">
              <button
                className="hover:bg-white rounded-md duration-150 px-2"
                onClick={() => {
                  setIsEditInfo(true);
                  setIsItemDropdown(false);
                }}
              >
                <p className="font-quicksand font-bold">Edit</p>
              </button>
              <button
                onClick={() => {
                  setIsDeleteExpenseItemMenuCardModal(true);
                }}
                className="hover:bg-white rounded-md duration-150 px-2"
              >
                <p className="font-quicksand font-bold">Delete</p>
              </button>
            </div>
          </div>
        )}

        <EditExpenseItemModal
          item={item}
          isOpen={isEditInfo}
          setOn={setIsEditInfo}
        />

        <DeleteExpenseItemMenuCardModal
          isOpen={isDeleteExpenseItemMenuCardModal}
          setOn={setIsDeleteExpenseItemMenuCardModal}
          confirmDelete={setIsDeleteExpenseItemMenuCard}
        />
      </div>
    </>
  );
}

export default ExpenseItemMenuCard;
