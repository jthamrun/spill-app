import { useState, Dispatch, SetStateAction, useContext } from "react";
import ReactPortal from "../ReactPortal";
import CurrencyInput from "react-currency-input-field";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ExpenseItem } from "../store/types";
import { useParams } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import LoadingContext from "../store/loading-context/loading-context";

// Define the props of Modal.
type ModalProps = {
  item?: ExpenseItem;
  isOpen: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
};
// Modal component.
const EditExpenseItemModal = ({ item, isOpen, setOn }: ModalProps) => {
  const params = useParams();
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);
  const [name, setName] = useState<string>(item?.name ?? "");
  const [quantity, setQuantity] = useState<number>(item?.quantity ?? 0);
  const [amount, setAmount] = useState<number>(item?.amount ?? 0);

  const { showLoader, hideLoader } = useContext(LoadingContext);

  const saveExpenseItemInfo = async () => {
    // loading component is not at the very top for this one, might be because of ReactPortal
    showLoader();
    // update item info on database
    try {
      await setDoc(
        doc(db, "expense-items", item?.item_id as string),
        {
          name,
          amount,
          quantity,
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
        <div className="fixed rounded-2xl flex flex-col box-border min-w-fit overflow-hidden px-8 pt-10 bg-white inset-y-32 inset-x-24 z-40 min-[900px]:max-w-screen-sm m-auto">
          <button
            className="self-end -mt-5 mb-5 -mr-2"
            onClick={() => setOn(false)}
            disabled={disabled}
          >
            <XCircleIcon className="h-6 " />
          </button>
          <h1 className="font-quicksand font-bold text-2xl text-center mb-4">
            Edit Expense Item Info
          </h1>
          <div className="space-y-2 self-center">
            <div>
              <label className="font-quicksand font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={name}
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
                htmlFor="price"
              >
                Price
              </label>
              <CurrencyInput
                id="price"
                value={amount}
                prefix="$"
                placeholder="Enter Price"
                decimalsLimit={2}
                onValueChange={(val, _) => {
                  val && setAmount(parseFloat(val));
                }}
                className="font-quicksand font-medium border border-black rounded-md py-2 pl-4 pr-8 w-full"
              />
            </div>

            <div>
              <label
                className="block font-quicksand font-medium"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                }}
                placeholder="Enter Quantity"
                type="number"
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
              onClick={saveExpenseItemInfo}
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
export default EditExpenseItemModal;
