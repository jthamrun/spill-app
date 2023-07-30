"use client";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { AnySessionProps, Expense, ExpenseItem } from "../store/types";

const ExpenseHistoryComponent = ({ session }: AnySessionProps) => {
  const [expenses, setExpenses] = useState<Expense[]>();
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

  return <div>Hello!</div>;
};

export default ExpenseHistoryComponent;
