import { getServerSession } from "next-auth";
import AddExpenseComponent from "../../../components/Expense/AddExpenseComponent";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

const AddExpensePage = async () => {
    const session = await getServerSession(authOptions);
    
  return (
    <div className="flex content-center justify-center h-auto">
      <AddExpenseComponent session={session} />
    </div>
  );
};

export default AddExpensePage;
