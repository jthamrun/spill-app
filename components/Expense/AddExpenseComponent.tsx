"use client";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import chroma from "chroma-js";
import CurrencyInput from "react-currency-input-field";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { AnySessionProps, Expense } from "../store/types";
import { useRouter } from "next/navigation";

const animatedComponents = makeAnimated();

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    maxWidth: "99.99%",
    backgroundColor: "white",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma((data as any).color);
    return {
      ...styles,
      backgroundColor: "white",
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : (data as any).color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? (data as any).color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma((data as any).color);
    return {
      ...styles,
      borderRadius: "9999px",
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: (data as any).color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: (data as any).color,
    ":hover": {
      borderRadius: "9999px",
      backgroundColor: (data as any).color,
      color: "white",
    },
  }),
};

type Option = {
  label: string;
  value: string;
  color?: string;
};

const getUsers = async (val: string) => {
  const searchArr = val.split(" ");

  for (var i = 0; i < searchArr.length; i++) {
    searchArr[i] = searchArr[i].charAt(0).toUpperCase() + searchArr[i].slice(1);
  }

  const searchMod = searchArr.join(" ");

  const options: Option[] = [];

  await getDocs(
    query(
      collection(db, "users"),
      where("name", ">=", searchMod),
      where("name", "<=", searchMod + "\uf8ff")
    )
  ).then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      options.push({
        value: doc.id,
        label: data.name,
        color: chroma.random().hex(),
      });
    });
  });

  return options;
};

const loadOptions = (
  inputValue: string,
  callback: (options: Option[]) => void
) => {
  setTimeout(async () => {
    callback(await getUsers(inputValue));
  }, 500);
};

const AddExpenseComponent = ({ session }: AnySessionProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0.1);
  const [tips, setTips] = useState<number>(0);
  const [users, setUsers] = useState<Option[]>(); // users involved in this expense

  const [didErrorOccur, setDidErrorOccur] = useState(false);

  const addExpense = async () => {
    // add the current expense into firebase
    await setDoc(doc(db, "expenses"), {
      creator_id: session.user.id,
      users: [],
      subtotal_amount: subtotal,
      total_amount: ((subtotal * tax )+ subtotal) + tips,
      tax_amount: tax,
      tip_amount: tips,
      status: "ongoing",
      items: []
    } as Expense).then(() => {
        router.replace('/expense/history')
    }).catch(() => {
        setDidErrorOccur(true);
    }) ;
  };
  return (
    <div>
      <div
        className={`${
          !didErrorOccur && "hidden"
        } font-quicksand relative my-5 py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg`}
        role="alert"
      >
        <p className="font-semibold">
          <span className="font-bold">Uh oh!</span> Something went wrong...
        </p>
        <span
          className="absolute inset-y-0 right-0 flex items-center mr-4"
          onClick={() => {
            setDidErrorOccur(false);
          }}
        >
          <svg
            className="w-4 h-4 fill-current"
            role="button"
            viewBox="0 0 20 20"
          >
            <path
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div
        key="default"
        className="grid p-3 mt-6 border-4 rounded-md border-black"
      >
        <h1 className="font-quicksand font-semibold text-4xl text-center mt-5 p-5">
          Create Expense
        </h1>
        <div>
          <label className="block font-quicksand font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 w-full"
          />
        </div>

        <div>
          <label className="block font-quicksand font-medium" htmlFor="date">
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
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 w-full"
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
            placeholder="Subtotal"
            decimalsLimit={2}
            onValueChange={(val, _) => {
              val && setSubtotal(parseFloat(val));
            }}
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 w-full"
          />
        </div>
        <div>
          <label className="block font-quicksand font-medium" htmlFor="tips">
            Tip
          </label>
          <CurrencyInput
            id="tips"
            prefix="$"
            placeholder="Tip"
            decimalsLimit={2}
            onValueChange={(val, _) => {
              val && setTips(parseFloat(val));
            }}
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 w-full"
          />
        </div>
        <div>
          <label className="block font-quicksand font-medium" htmlFor="tax">
            Tax
          </label>
          <CurrencyInput
            id="tax"
            suffix="%"
            placeholder="Tax"
            decimalsLimit={2}
            onValueChange={(val, _) => {
              val && setTax(parseFloat(val) / 100);
            }}
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 w-full"
          />
        </div>
        <div>
          <label className="block font-quicksand font-semibold" htmlFor="users">
            Who's involved?
          </label>
          <AsyncSelect
            id="users"
            menuPlacement="auto"
            menuPosition="fixed"
            components={animatedComponents}
            className="font-quicksand font-medium border-2 border-black rounded-md my-2"
            closeMenuOnSelect={false}
            isMulti
            styles={colourStyles}
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={(e) => {
              setUsers(e as Option[]);
            }}
            placeholder=""
          />
        </div>

        <button
          onClick={() => {}}
          disabled
          className="disabled:bg-gray-500 disabled:border-gray-200 font-quicksand font-bold border-2 border-green-200 rounded-md bg-base-green text-white py-2 my-2 hover:-translate-y-0.5 duration-150 ease-out"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExpenseComponent;
