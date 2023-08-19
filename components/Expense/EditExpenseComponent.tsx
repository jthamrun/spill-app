import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { Expense } from "../store/types";
import { LinkIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import ExpenseItemMenu from "./ExpenseItemMenu";
import EditExpenseInfoModal from "./EditExpenseInfoModal";
import moment from "moment";
import LoadingContext from "../store/loading-context/loading-context";
import { useRouter } from "next/navigation";
import { randomUUID } from "crypto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  id: string;
};

const EditExpenseComponent = ({ id }: Props) => {
  const router = useRouter();
  const [expense, setExpense] = useState<Expense>();
  const [inviteId, setInviteId] = useState<string>("");
  const [isInviteCopied, setIsInviteCopied] = useState<boolean>(false);
  const [isEditInfo, setIsEditInfo] = useState(false);

  const [users, setUsers] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const { showLoader, hideLoader } = useContext(LoadingContext);

  const getExpense = async () => {
    showLoader();
    try {
      const snapshot = await getDoc(doc(db, "expenses", id));
      if (snapshot.exists()) {
        const document = snapshot.data()!;
        // const usersList: UserExpense[] = [];
        // const itemsList: ExpenseItem[] = [];
        // // set the users and items atrribute respectively
        // (document.items as string[]).forEach(async (item: string) => {
        //   await getDoc(doc(db, "expense-items", item)).then((snap) => {
        //     if (snap.exists()) {
        //       const data = snapshot.data()!;
        //       itemsList.push({
        //         item_id: snap.id,
        //         name: data.name,
        //         amount: data.amount,
        //         quantity: data.quantity,
        //         ordered_by: data.ordered_by,
        //       });
        //     }
        //   });
        // });
        setUsers(document.users as string[]);
        setItems(document.items as string[]);
        document.inviteId && setInviteId(document.inviteId as string);
        // (document.users as string[]).forEach((user: string) => {
        //   let total_amount = 0;
        //   itemsList.forEach((item) => {
        //     item.ordered_by.includes(user) && (total_amount += item.amount);
        //   });
        //   usersList.push({
        //     user_id: user,
        //     total_amount,
        //   });
        // });
        setExpense({
          expense_id: snapshot.id,
          creator_id: document.creator_id,
          name: document.name,
          date: document.date,
          subtotal_amount: document.subtotal_amount,
          total_amount: document.total_amount,
          tax_amount: document.tax_amount,
          tip_amount: document.tip_amount,
          status: document.status,
        });
      } else {
        // route to a 404 no expense found page or display an error in this page immediately
      }
    } catch (err) {
      // router.push('/dashboard')
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 1000);
    }
  };

  const updateExpense = async (docu: DocumentSnapshot<DocumentData>) => {
    showLoader();
    try {
      const document = docu.data()!;
      // const usersList: UserExpense[] = [];

      // (document.users as string[]).forEach((user: string) => {
      //   let total_amount = 0;
      //   itemsList.forEach((item) => {
      //     item.ordered_by.includes(user) && (total_amount += item.amount);
      //   });
      //   usersList.push({
      //     user_id: user,
      //     total_amount,
      //   });
      // });
      setUsers(document.users as string[]);
      setItems(document.items as string[]);
      document.inviteId && setInviteId(document.inviteId as string);
      setExpense({
        expense_id: docu.id,
        creator_id: document.creator_id,
        name: document.name,
        date: document.date,
        subtotal_amount: document.subtotal_amount,
        total_amount: document.total_amount,
        tax_amount: document.tax_amount,
        tip_amount: document.tip_amount,
        status: document.status,
      });
    } catch (err) {
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 1000);
    }
  };

  const sendInviteLink = async () => {
    try {
      let invite_id: string = inviteId;
      // if (!invite_id) {
      //   invite_id = randomUUID();

      //   await setDoc(
      //     doc(db, "expenses", id),
      //     {
      //       inviteId: invite_id,
      //     },
      //     { merge: true }
      //   );
      //   setInviteId(invite_id);
      // }

      // copy to clipboard
      await navigator.clipboard.writeText(invite_id);

      setIsInviteCopied(true);
    } catch (err) {
      // error with either uploading new invite to DB or copying invite to clipboard
      toast.error("Error Copying", {
        autoClose: 2000, //2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      if (isInviteCopied) {
        toast.success("Copied Invite Link", {
          autoClose: 2000, //2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  useEffect(() => {
    getExpense();
    // listen to any changes in expenses db (catch errors)
    const unsub_expense = onSnapshot(doc(db, "expenses", id), (docu) => {
      updateExpense(docu);
    });

    return () => {
      unsub_expense();
    };
  }, []); //retrieve data first time loading

  // you can use "expense" variable to work on the UI.
  // just to remind, two cases: outsider visits this link, and creator visit the link
  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 min-[900px]:space-y-0 min-[900px]:space-x-10 min-[900px]:flex-row min-[900px]:justify-center h-[92vh]">
      <div className="flex flex-col min-[900px]:mx-0 space-y-4 self-center min-[900px]:self-auto">
        <div className="toast-container">
          <ToastContainer
            limit={2}
            bodyClassName={() =>
              "flex space-x-2 items-center font-quicksand font-bold pl-2"
            }
          />
        </div>
        <div className="border border-black rounded-md">
          <div className="flex py-4 space-x-10 justify-center min-[900px]:px-16">
            <h1 className="font-quicksand font-bold">{expense?.name}</h1>
            <p>{expense?.date && moment(expense?.date).format("MM/DD/YYYY")}</p>
          </div>
          <div className="h-[1px] bg-black w-full"></div>
          <div className="py-6 flex space-x-10 justify-center min-[900px]:px-16">
            <p className="font-quicksand font-bold">{`$${
              expense?.total_amount ?? 0
            }`}</p>
            <p className="font-quicksand font-medium">
              <span className="font-bold">{users.length}</span> Friends
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

          <button
            onClick={sendInviteLink}
            className="h-full bg-base-green border border-black rounded-md py-2 px-3"
          >
            <LinkIcon className="h-5" />
          </button>
        </div>
      </div>

      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 m-auto">
        <ExpenseItemMenu id={id} items={items} />
      </div>

      <EditExpenseInfoModal
        expense={expense}
        isOpen={isEditInfo}
        setOn={setIsEditInfo}
      />
    </div>
  );
};

export default EditExpenseComponent;
