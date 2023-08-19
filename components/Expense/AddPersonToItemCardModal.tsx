import { useState, Dispatch, SetStateAction, useEffect } from "react";
import ReactPortal from "../ReactPortal";
import { XCircleIcon } from "@heroicons/react/24/outline";
import SearchPeopleContent from "../SearchPeople/SearchPeopleContent";

// Define the props of Modal.
type ModalProps = {
  isOpen: boolean;
  setOn: Dispatch<SetStateAction<boolean>>;
};
// Modal component.
const AddPersonToItemCardModal = ({ isOpen, setOn }: ModalProps) => {
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);

  // Return null if isOpen props from parent is false.
  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
        <div className="fixed rounded-2xl flex flex-col box-border min-w-fit overflow-auto px-8 pt-10 bg-white inset-y-32 inset-x-6 sm:inset-x-12 min-[900px]:inset-x-24 z-40 min-[900px]:max-w-screen-sm m-auto">
          <button
            className="self-end -mt-5 mb-5 -mr-2"
            onClick={() => setOn(false)}
            disabled={disabled}
          >
            <XCircleIcon className="h-6 " />
          </button>
          <h1 className="font-quicksand font-bold text-2xl text-center mb-4">
            Add People to Item Group
          </h1>
          <SearchPeopleContent placeholder="Search People, @username" />
        </div>
      </>
    </ReactPortal>
  );
};
export default AddPersonToItemCardModal;
