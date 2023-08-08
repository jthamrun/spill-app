import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { Expense, ExpenseItem, UserExpense } from "../store/types";
import { LinkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import ExpenseItemMenu from "./ExpenseItemMenu";
import EditExpenseInfoModal from "./EditExpenseInfoModal";

type Props = {
  id: string;
};

const EditExpenseComponent = ({ id }: Props) => {
  const [expense, setExpense] = useState<Expense>();
  const [isSaved, setIsSaved] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);

  function saveButtonWrapper(fn: (...args: any[]) => any) {
    // do this everytime anything expense-related is edited. enables the save button
    return function (...args: any[]) {
      const result = fn(...args);
      setIsSaved(true);
      return result;
    };
  }
  const updateItemInfo = (item: ExpenseItem) => {
    // when a user edits an expense item info, this is called

    setExpense((exp: any) => {
      return {
        ...exp,
        items: [
          ...exp.items.filter((e: ExpenseItem) => e.item_id == item.item_id),
          item,
        ],
      };
    });
  };

  const updateItemUsers = (item: ExpenseItem) => {
    // when a user is added or removed from an expense item, this is called
    // this should be used in the ExpenseItemMenuUserGroup
  };

  const updateUsers = (user: UserExpense) => {
    // when creator adds a user, this is called
  };
  useEffect(() => {
    const getExpense = async () => {
      await getDoc(doc(db, "expenses", id)).then((snapshot) => {
        if (snapshot.exists()) {
          const document = snapshot.data()!;
          const usersList: UserExpense[] = [];
          const itemsList: ExpenseItem[] = [];
          // set the users and items atrribute respectively
          (document.items as string[]).forEach(async (item: string) => {
            await getDoc(doc(db, "expense-items", item)).then((snap) => {
              if (snap.exists()) {
                const data = snapshot.data()!;
                itemsList.push({
                  item_id: snap.id,
                  name: data.name,
                  amount: data.amount,
                  quantity: data.quantity,
                  ordered_by: data.ordered_by,
                });
              }
            });
          });

          (document.users as string[]).forEach((user: string) => {
            let total_amount = 0;
            itemsList.forEach((item) => {
              item.ordered_by.includes(user) && (total_amount += item.amount);
            });
            usersList.push({
              user_id: user,
              total_amount,
            });
          });
          setExpense({
            expense_id: snapshot.id,
            creator_id: document.creator_id,
            users: usersList,
            subtotal_amount: document.subtotal_amount,
            total_amount: document.total_amount,
            tax_amount: document.tax_amount,
            tip_amount: document.tip_amount,
            status: document.status,
            items: itemsList,
          });
        } else {
          // route to a 404 no expense found page or display an error in this page immediately
        }
      });
    };
    getExpense();
  }, []); //retrieve data first time loading

  // you can use "expense" variable to work on the UI.
  // just to remind, two cases: outsider visits this link, and creator visit the link
  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 min-[900px]:space-y-0 min-[900px]:space-x-10 min-[900px]:flex-row min-[900px]:justify-center h-[92vh]">
      <div className="flex flex-col min-[900px]:mx-0 space-y-4 self-center min-[900px]:self-auto">
        <div className="border border-black rounded-md">
          <div className="flex py-4 space-x-10 justify-center min-[900px]:px-16">
            <h1 className="font-quicksand font-bold">BCD</h1>
            <p>08/02/2023</p>
          </div>
          <div className="h-[1px] bg-black w-full"></div>
          <div className="py-6 flex space-x-10 justify-center min-[900px]:px-16">
            <p className="font-quicksand font-bold">$123.43</p>
            <p className="font-quicksand font-medium">
              <span className="font-bold">11</span>Friends
            </p>
          </div>
        </div>

        <div className="flex items-center self-center space-x-2">
          <button className="bg-base-green p-2 rounded-md border border-black">
            <p className="font-quicksand font-bold">Breakdown</p>
          </button>
          <button className="bg-base-green py-2 px-6 rounded-md border border-black">
            <p className="font-quicksand font-bold">Verify</p>
          </button>
          <button
            className="h-full bg-base-green border border-black rounded-md py-2 px-3"
            onClick={() => setIsEditInfo(true)}
          >
            <PencilIcon className="h-5" />
          </button>

          <button className="h-full bg-base-green border border-black rounded-md py-2 px-3">
            <LinkIcon className="h-5" />
          </button>
        </div>
      </div>

      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 m-auto">
        <ExpenseItemMenu />
      </div>

      <EditExpenseInfoModal isOpen={isEditInfo} setOn={setIsEditInfo} />
    </div>
  );
};

export default EditExpenseComponent;
