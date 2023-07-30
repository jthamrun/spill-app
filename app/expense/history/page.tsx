import { getServerSession } from "next-auth";
import ExpenseHistoryComponent from "../../../components/Expense/ExpenseHistoryComponent";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

const ExpenseHistoryPage = async () => {
    const session = await getServerSession(authOptions)
    return <ExpenseHistoryComponent session={session as any}/>
}

export default ExpenseHistoryPage;