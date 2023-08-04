"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import EditExpenseComponent from "../../../../components/Expense/EditExpenseComponent";

const editExpensePage = () => {
    const params = useParams()!;
  const [editId, setEditId] = useState("");

  useEffect(() => {
     setEditId(params.editId as string)
  }, [params])

  return <EditExpenseComponent id={editId} />
}

export default editExpensePage;