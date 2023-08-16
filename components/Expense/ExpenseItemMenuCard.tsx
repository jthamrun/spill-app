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

type Props = {
  item?: ExpenseItem;
  onDelete?: (_: ExpenseItem) => Promise<void>;
};

function ExpenseItemMenuCard({ item, onDelete }: Props) {
  const { showLoader, hideLoader } = useContext(LoadingContext);
  const [isDetailedItem, setIsDetailedItem] = useState(false);
  const [isItemDropdown, setIsItemDropdown] = useState(false);
  const itemDetail = useRef<HTMLInputElement>(null);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [groups, setGroups] = useState<ExpenseItemGroup[]>([]);

  const getExpenseItemGroups = async () => {
    showLoader();
    try {
      let groupList: ExpenseItemGroup[] = [];
      item?.groups.forEach(async (group_id: string) => {
        const groupSnap = await getDoc(
          doc(db, "expense-item-groups", group_id)
        );
        if (groupSnap.exists()) {
          const groupData = groupSnap.data();
          groupList.push({
            group_id: groupSnap.id,
            item_id: groupData.item_id,
            splitOption: groupData.splitOption,
            splitAmount: (groupData.splitAmount ?? []) as UserExpenseGroup[],
          } as ExpenseItemGroup);
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
        groupsArray.splice(
          groupsArray.findIndex((group) => group.group_id === doc.id),
          1,
          {
            group_id: doc.id,
            item_id: group_data.item_id,
            splitOption: group_data.splitOption,
            splitAmount: (group_data.splitAmount ?? []) as UserExpenseGroup[],
          } as ExpenseItemGroup
        );
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
    // only add the event listener when the dropdown is opened
    if (!isDetailedItem && !isItemDropdown) return;
    function handleClick(event: any) {
      if (itemDetail.current && !itemDetail.current.contains(event.target)) {
        setIsDetailedItem(false);
        setIsItemDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isDetailedItem, isItemDropdown]);

  return (
    <div ref={itemDetail} className="relative">
      <div
        className={`flex items-center justify-between border border-black rounded-md p-3 hover:bg-base-green duration-150 ${
          isDetailedItem ? "bg-base-green" : "bg-white"
        }`}
      >
        <p className="font-quicksand font-bold">
          {item?.name ?? "Dumpling Tofu Soup"}
        </p>
        <div className="flex items-center space-x-8">
          <p className="font-quicksand font-bold">${item?.amount ?? "11.99"}</p>
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
          {groups.map((group) => (
            <ExpenseItemCard key={group.group_id} group={group} />
          ))}
          <ExpenseItemCard />
          <ExpenseItemCard />
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
                onDelete!(item!);
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
    </div>
  );
}

export default ExpenseItemMenuCard;
