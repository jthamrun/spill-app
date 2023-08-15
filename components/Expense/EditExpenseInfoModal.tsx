import {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import ReactPortal from "../ReactPortal";
import CurrencyInput from "react-currency-input-field";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Expense } from "../store/types";
import moment from "moment";
import LoadingContext from "../store/loading-context/loading-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

// Define the props of Modal.
type ModalProps = {
  expense?: Expense;
  isOpen: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
};
// Modal component.
const EditExpenseInfoModal = ({ expense, isOpen, setOn }: ModalProps) => {
  const { isLoading, showLoader, hideLoader } = useContext(LoadingContext);
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0.1);
  const [tips, setTips] = useState<number>(0);

  const saveExpenseInfo = async () => {
    showLoader();
    try {
      await setDoc(
        doc(db, "expenses", expense?.creator_id as string),
        {
          name,
          date: date?.toLocaleDateString(),
          subtotal_amount: subtotal,
          tip_amount: tips,
          tax_amount: tax,
        },
        { merge: true }
      );
    } catch (err) {
    } finally {
      setTimeout(() => {
        hideLoader();
        setOn(false);
      }, 1000);
    }
  };

  // Return null if isOpen props from parent is false.
  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
        <div className="fixed rounded-2xl flex flex-col box-border min-w-fit overflow-hidden py-5 px-8 bg-white inset-y-32 inset-x-24 z-40 min-[900px]:max-w-screen-sm m-auto justify-center">
          <button
            className="self-end -mt-5 -mr-2"
            onClick={() => setOn(false)}
            disabled={disabled}
          >
            <XCircleIcon className="h-6 " />
          </button>
          <h1 className="font-quicksand font-bold text-2xl text-center mb-4">
            Edit Expense Info
          </h1>
          <div className="space-y-2 self-center">
            <div>
              <label className="font-quicksand font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={expense?.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Name"
                type="text"
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>

            <div>
              <label
                className="block font-quicksand font-medium"
                htmlFor="date"
              >
                Date
              </label>
              <input
                id="date"
                value={
                  expense?.date && moment(expense.date).format("MM-DD-YYYY")
                }
                onChange={(e) => {
                  console.log(
                    new Date(`${e.target.value}T00:00`).toLocaleDateString()
                  ); // to save in database, convert to ISO string
                  setDate(new Date(`${e.target.value}T00:00`));
                }}
                type="date"
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>

            <div>
              <label
                className="block font-quicksand font-medium"
                htmlFor="subtotal"
              >
                Subtotal
              </label>
              <CurrencyInput
                id="subtotal"
                value={expense?.subtotal_amount}
                prefix="$"
                placeholder="Enter Subtotal"
                decimalsLimit={2}
                onValueChange={(val, _) => {
                  val && setSubtotal(parseFloat(val));
                }}
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>
            <div>
              <label
                className="block font-quicksand font-medium"
                htmlFor="tips"
              >
                Tip
              </label>
              <CurrencyInput
                id="tips"
                value={expense?.tip_amount}
                prefix="$"
                placeholder="Enter Tip"
                decimalsLimit={2}
                onValueChange={(val, _) => {
                  val && setTips(parseFloat(val));
                }}
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>
            <div>
              <label className="block font-quicksand font-medium" htmlFor="tax">
                Tax
              </label>
              <CurrencyInput
                id="tax"
                value={expense?.tax_amount}
                suffix="%"
                placeholder="Enter Tax"
                decimalsLimit={2}
                onValueChange={(val, _) => {
                  val && setTax(parseFloat(val) / 100);
                }}
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              className="border border-black rounded-md py-2 px-4 bg-yellow-400"
              onClick={() => setOn(false)}
              disabled={disabled}
            >
              <p className="font-quicksand font-bold">Back</p>
            </button>
            <button
              className="border border-black rounded-md py-2 px-4 bg-base-green"
              onClick={saveExpenseInfo}
              disabled={disabled}
            >
              <p className="font-quicksand font-bold">Save</p>
            </button>
            <button
              className="border border-black rounded-md py-2 px-4 bg-error-red"
              disabled={disabled}
            >
              <p className="font-quicksand font-bold">Delete</p>
            </button>
          </div>
        </div>
      </>
    </ReactPortal>
  );
};
export default EditExpenseInfoModal;
