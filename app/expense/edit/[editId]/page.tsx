"use client";
import { useParams } from "next/navigation";
import EditExpenseComponent from "../../../../components/Expense/EditExpenseComponent";

const editExpensePage = async () => {
  const params = useParams()!;

  return <EditExpenseComponent id={params.editId as string} />;
};

export default editExpensePage;
