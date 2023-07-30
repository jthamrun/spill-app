"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import EditExpenseComponent from "../../../../components/Expense/EditExpenseComponent";

const editExpensePage = () => {
    const pathname = usePathname()!;
  const [editId, setEditId] = useState("");

  useEffect(() => {
     setEditId(pathname.split("/").pop() as string)
  }, [pathname])

  return <EditExpenseComponent />
}

export default editExpensePage;