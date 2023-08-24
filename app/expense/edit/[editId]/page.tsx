import EditExpenseComponent from "../../../../components/Expense/EditExpenseComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

const editExpensePage = async () => {

  const session = await getServerSession(authOptions) as any;

  return <EditExpenseComponent currentUser={session.user.id}/>;
};

export default editExpensePage;
