import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import ExpenseItemMenuCard from "./ExpenseItemMenuCard";
import {
  ExpenseItem,
  ExpenseItemGroup,
  UserExpenseGroup,
} from "../store/types";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addExpenseItem,
  removeExpenseItem,
  selectExpenseItems,
  updateExpenseItem,
} from "../store/expenses/expenseSlice";

type Props = {
  id: string;
  items: string[];
  currentUser: string;
  creatorId: string;
};

function ExpenseItemMenu({ id, items, currentUser, creatorId }: Props) {
  const [itemField, setItemField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [quantityField, setQuantityField] = useState("");

  const { showLoader, hideLoader } = useContext(LoadingContext);

  const [itemsList, setItemsList] = useState<ExpenseItem[]>([]);

  const expenseItems = useAppSelector(selectExpenseItems);
  const dispatch = useAppDispatch();

  const getExpenseItems = async () => {
    showLoader();
    try {
      const itemsList: ExpenseItem[] = [];
      // set the items atrribute respectively

      items.forEach(async (item: string) => {
        if (expenseItems.some((expenseItem) => expenseItem.item_id === item)) {
          // then we know expense item is available in redux
          itemsList.push(
            expenseItems.find((expenseItem) => expenseItem.item_id === item)!
          );
        } else {
          const snap = await getDoc(doc(db, "expense-items", item));
          if (snap.exists()) {
            const data = snap.data()!;
            const expenseItem = {
              item_id: snap.id,
              expense_id: data.expense_id,
              name: data.name,
              amount: parseInt(data.amount),
              quantity: parseInt(data.quantity),
              groups: data.groups,
            };
            itemsList.push(expenseItem);
            dispatch(addExpenseItem(expenseItem));
          }
        }
      });

      setItemsList(itemsList);
    } catch (err) {
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 1000);
    }
  };

  const deleteExpenseItem = async (item: ExpenseItem) => {
    // delete expense item from db and local storage
    showLoader();
    try {
      // console.log("Deleting");
      await deleteDoc(doc(db, "expense-items", item.item_id));
      setItemsList((prev) => prev.filter((i) => i.item_id !== item.item_id));
      dispatch(removeExpenseItem(item.item_id));
    } catch (err) {
      toast.error("Error Deleting", {
        autoClose: 2000, //2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 1000);
      toast.success("Successfully Deleted!", {
        autoClose: 2000, //2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const updateExpenseItems = (snapshot: QuerySnapshot<DocumentData>) => {
    showLoader();
    const itemsArray: ExpenseItem[] = itemsList;
    snapshot.forEach((doc) => {
      const item_data = doc.data();
      const expenseItem = {
        item_id: doc.id,
        expense_id: item_data.expense_id,
        name: item_data.name,
        amount: parseInt(item_data.amount),
        quantity: parseInt(item_data.quantity),
        groups: item_data.groups,
      } as ExpenseItem;
      itemsArray.splice(
        itemsArray.findIndex((item) => item.item_id === doc.id),
        1,
        expenseItem
      );
      dispatch(updateExpenseItem(expenseItem));
    });

    setItemsList(itemsArray);
    hideLoader();
  };

  useEffect(() => {
    getExpenseItems();
    // listen to any expense items changes related to the user (catch errors)
    const unsub_expense_items = onSnapshot(
      query(collection(db, "expense-items"), where("expense_id", "==", id)),
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
        <div className="toast-container">
          <ToastContainer
            limit={2}
            bodyClassName={() =>
              "flex space-x-2 items-center font-quicksand font-bold pl-2"
            }
          />
        </div>
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

      <div className="flex flex-col">
        {itemsList.map((item: ExpenseItem) => (
          <ExpenseItemMenuCard
            key={item.item_id}
            item={item}
            onDelete={deleteExpenseItem}
            currentUser={currentUser}
            creatorId={creatorId}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseItemMenu;
