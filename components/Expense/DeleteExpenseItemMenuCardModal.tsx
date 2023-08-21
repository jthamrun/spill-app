import { useState, Dispatch, SetStateAction, useContext } from "react";
import ReactPortal from "../ReactPortal";
import { XCircleIcon } from "@heroicons/react/24/outline";

// Define the props of Modal.
type ModalProps = {
  isOpen: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
  confirmDelete: Dispatch<SetStateAction<boolean>>;
};
// Modal component.
const DeleteExpenseItemMenuCardModal = ({
  isOpen,
  setOn,
  confirmDelete,
}: ModalProps) => {
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);

  // Return null if isOpen props from parent is false.
  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
        <div className="fixed rounded-2xl flex flex-col box-border min-w-fit overflow-auto px-8 pt-10 bg-white inset-y-64 inset-x-12 min-[900px]:inset-x-24 z-40 min-[900px]:max-w-screen-sm m-auto">
          <button
            className="self-end -mt-5 mb-5 -mr-2"
            onClick={() => setOn(false)}
            disabled={disabled}
          >
            <XCircleIcon className="h-6 " />
          </button>
          <h1 className="font-quicksand font-bold text-2xl text-center mb-4">
            Confirm Delete
          </h1>
          <div className="flex flex-col items-center mt-4">
            <h3 className="font-quicksand font-medium">
              Would you like to delete this Expense Item?
            </h3>
            <div className="flex justify-center space-x-4 mt-8">
              <button
                className="border border-black rounded-md py-2 px-4 bg-yellow-400"
                onClick={() => setOn(false)}
                disabled={disabled}
              >
                <p className="font-quicksand font-bold">Back</p>
              </button>

              <button
                className="border border-black rounded-md py-2 px-4 bg-error-red"
                disabled={disabled}
                onClick={() => {
                  setOn(false);
                  confirmDelete(true);
                }}
              >
                <p className="font-quicksand font-bold">Delete</p>
              </button>
            </div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
};
export default DeleteExpenseItemMenuCardModal;
