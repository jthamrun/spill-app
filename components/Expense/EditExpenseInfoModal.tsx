import { useState, Dispatch, SetStateAction } from "react";
import ReactPortal from "../ReactPortal";
import CurrencyInput from "react-currency-input-field";
import { XCircleIcon } from "@heroicons/react/24/outline";

// Define the props of Modal.
type ModalProps = {
  isOpen: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
};
// Modal component.
const EditExpenseInfoModal = ({ isOpen, setOn }: ModalProps) => {
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0.1);
  const [tips, setTips] = useState<number>(0);

  // Return null if isOpen props from parent is false.
  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
        <div className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-white inset-y-32 inset-x-24 z-50 min-[900px]:max-w-screen-sm m-auto justify-center">
          <button
            className="self-end -mt-5"
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
              className="border border-black rounded-md py-2 px-4 bg-base-green"
              onClick={() => setOn(false)}
              disabled={disabled}
            >
              <p className="font-quicksand font-bold">Back</p>
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
