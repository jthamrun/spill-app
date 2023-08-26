import React from "react";
import { Expense } from "../store/types";
import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {
  expense?: Expense;
};

function ExpenseCard({ expense }: Props) {
  const router = useRouter();
  const accessExpense = () => {
    router.push(`/expense/edit/${expense?.expense_id}`);
  };

  return (
    <div
      onClick={accessExpense}
      className="flex flex-col border border-black rounded-md py-2 px-4 hover:bg-black group duration-150"
    >
      <p className="font-bold font-quicksand group-hover:text-white">
        {expense?.name ?? "BCD"}
      </p>

      <div className="pt-8">
        <p className="font-quicksand text-expense-gray group-hover:text-nav-gray">
          {expense?.date
            ? moment(expense.date).format("MM/DD/YYYY")
            : "07/29/2023"}
        </p>
        <p className="font-quicksand font-bold text-xl group-hover:text-white">
          ${(expense?.total_amount)?.toFixed(2) ?? "11.22"}
        </p>
      </div>
    </div>
  );
}

export default ExpenseCard;
