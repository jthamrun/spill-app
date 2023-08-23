import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

type Props = {
  name: string;
  totalAmount: number;
  disableAmount: boolean;
  removePerson: () => void;
  updateUserGroupAmount: (_: number) => void;
};

const PersonGroupInfoCarouselCard = ({
  name,
  totalAmount: total_amount,
  disableAmount,
  removePerson,
  updateUserGroupAmount,
}: Props) => {
  const [totalAmount, setTotalAmount] = useState<number>(total_amount);

  useEffect(() => {
    setTotalAmount(total_amount);
  }, [total_amount]);
  // updating total_amount to user group doesnt work
  return (
    <div className="flex flex-col items-center">
      <button className="self-end -mt-5 mr-2" onClick={removePerson}>
        <XMarkIcon className="h-4" />
      </button>
      <div className="flex h-20 w-20 rounded-full justify-center items-center bg-base-green">
        <h1 className="text-2xl font-quicksand font-bold">
          {name
            .split(" ")
            .map((n) => n.charAt(0))
            .join("")}
        </h1>
      </div>
      <div
        className="flex mt-2 w-32"
        onBlur={() => {
          updateUserGroupAmount(totalAmount);
        }}
      >
        <p className="px-1 w-6/12 border border-transparent border-r-0 rounded-l-md text-left bg-base-green">
          Amount
        </p>
        <CurrencyInput
          disabled={disableAmount}
          className="px-1 w-6/12 font-quicksand font-semibold text-black text-center focus:outline-none border border-l-0 border-base-green rounded-r-md"
          prefix="$"
          decimalsLimit={2}
          value={totalAmount}
          onValueChange={(e, _) => {
            e ? setTotalAmount(parseFloat(e)) : setTotalAmount(0);
          }}
        />
      </div>
    </div>
  );
};

export default PersonGroupInfoCarouselCard;
