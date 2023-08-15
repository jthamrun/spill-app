import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import ExpenseItemMenuCard from "./ExpenseItemMenuCard";
import { ExpenseItem } from "../store/types";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import LoadingContext from "../store/loading-context/loading-context";

type Props = {
  id: string;
  items: string[];
};

function ExpenseItemMenu({ id, items }: Props) {
  const [itemField, setItemField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [quantityField, setQuantityField] = useState("");

  const { showLoader, hideLoader } = useContext(LoadingContext);

  const [itemsList, setItemsList] = useState<ExpenseItem[]>([]);

  const getExpenseItems = async () => {
    const itemsList: ExpenseItem[] = [];
    // set the items atrribute respectively

    items.forEach(async (item: string) => {
      await getDoc(doc(db, "expense-items", item)).then((snap) => {
        if (snap.exists()) {
          const data = snap.data()!;
          itemsList.push({
            item_id: snap.id,
            expense_id: data.expense_id,
            name: data.name,
            amount: data.amount,
            quantity: data.quantity,
            ordered_by: data.ordered_by,
          });
        }
      });
    });

    setItemsList(itemsList);
  };

  const deleteExpenseItem = async (item: ExpenseItem) => {
    // delete expense item from db and local storage
    showLoader();
    try {
      await deleteDoc(doc(db, "expense-items", item.item_id));
      setItemsList((prev) => prev.filter((i) => i.item_id !== item.item_id));
    } catch (err) {
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 1000);
    }
  };

  const updateExpenseItems = (snapshot: QuerySnapshot<DocumentData>) => {
    showLoader();
    const itemsArray: ExpenseItem[] = itemsList;
    snapshot.forEach((doc) => {
      const item_data = doc.data();
      itemsArray.splice(
        itemsArray.findIndex((item) => item.item_id === doc.id),
        1,
        {
          item_id: doc.id,
          expense_id: item_data.expense_id,
          name: item_data.name,
          amount: parseInt(item_data.amount),
          quantity: parseInt(item_data.quantity),
          ordered_by: item_data.ordered_by,
        } as ExpenseItem
      );
    });

    setItemsList(itemsArray);
    hideLoader();
  };

  useEffect(() => {
    getExpenseItems();
    // listen to any expense items changes related to the user (catch errors)
    const unsub_expense_items = onSnapshot(
      query(collection(db, "expenses"), where("expense_id", "==", id)),
      (snapshot) => {
        updateExpenseItems(snapshot);
      }
    );
    // clean up
    return () => {
      unsub_expense_items();
    };
  }, []);

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
        {itemsList.map((item: ExpenseItem) => (
          <ExpenseItemMenuCard
            key={item.item_id}
            item={item}
            onDelete={deleteExpenseItem}
          />
        ))}
        <ExpenseItemMenuCard />
        <ExpenseItemMenuCard />
        <ExpenseItemMenuCard />
      </div>
    </div>
  );
}

export default ExpenseItemMenu;
