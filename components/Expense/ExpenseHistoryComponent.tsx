"use client";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { AnySessionProps, Expense, ExpenseItem } from "../store/types";
import ExpenseCard from "./ExpenseCard";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const ExpenseHistoryComponent = ({ session }: AnySessionProps) => {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      // get past expenses of the current user (ongoing, finished, cancelled(?) )
      const expenseList: Expense[] = [];
      await getDocs(
        query(
          collection(db, "expenses"),
          or(
            where("creator_id", "==", session.user.id),
            where("users", "array-contains", session.user.id)
          )
        )
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const exp: Expense = {
            expense_id: doc.id,
            creator_id: data.creator_id,
            users: data.users,
            subtotal_amount: data.subtotal_amount,
            total_amount: data.total_amount,
            tax_amount: data.tax_amount,
            tip_amount: data.tip_amount,
            status: data.status,
            items: [],
          };

          // find each of the expense items in database
          data.items.forEach(async (item: string) => {
            await getDocs(
              query(
                collection(db, "expense-items"),
                where("__name__", "==", item)
              )
            ).then((item_snapshot) => {
              item_snapshot.forEach((item_doc) => {
                const item_data = item_doc.data();
                exp.items?.push({
                  item_id: item,
                  name: item_data.name,
                  amount: item_data.amount,
                  quantity: item_data.quantity,
                  ordered_by: item_data.ordered_by, // should we only collect list of user_id or the users object list?
                });
              });
            });
          });

          expenseList.push(exp);
        });
      });

      setExpenses(expenseList);
    };

    getExpenses();
  }, []);

  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 md:space-y-0 md:space-x-10 md:flex-row md:justify-center h-[92vh]">
      <div className="mx-10 md:mx-0 border border-black rounded-md text-center md:self-start">
        <h1 className="py-4 font-quicksand font-bold md:px-20">
          Past Expenses
        </h1>
        <div className="h-[1px] bg-black w-full"></div>
        <h3 className="py-6 font-quicksand font-medium">
          <span className="font-bold">3</span> Expenses
        </h3>
      </div>
      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 md:min-w-[30%]">
        <div className="flex items-center p-2 h-10 w-full rounded-md pace-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
          <input
            className="font-quicksand text-black focus:outline-none w-full"
            type="text"
            placeholder="Search Expense"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <MagnifyingGlassIcon className="h-5" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
        </div>
      </div>
    </div>
  );
};

export default ExpenseHistoryComponent;
