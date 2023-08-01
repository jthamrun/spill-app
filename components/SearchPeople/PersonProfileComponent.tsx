import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { User } from "../store/types";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import ExpenseCard from "../Expense/ExpenseCard";

type Props = {
  id: string;
};

const PersonProfileComponent = ({ id }: Props) => {
  const [search, setSearch] = useState("");
  const [friendStatus, setFriendStatus] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    const getProfile = async () => {
      await getDocs(
        query(collection(db, "users"), where("__name__", "==", id))
      ).then((doc) => {
        doc.forEach((d) => {
          const data = d.data();
          setUser({ id: d.id, name: data.name, email: data.email });
        });
      });
    };
    id && getProfile();
  }, [id]);
  return (
    <div className="flex flex-col items-center border border-black rounded-md">
      <div className="flex flex-col items-center py-4">
        <h1 className="font-quicksand text-2xl font-bold">{user.name}</h1>
        <p className="font-quicksand">Between You</p>
      </div>
      <div className="h-[1px] bg-black w-full"></div>
      <div className="py-4 flex w-full space-x-4 px-4">
        <div className="flex items-center p-2 h-10 w-full rounded-md px-4 space-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
          <input
            className="font-quicksand text-search-bar-gray focus:outline-none w-full"
            type="text"
            placeholder="Search Expense"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <MagnifyingGlassIcon className="h-5" />
        </div>
        <button
          className={`flex items-center justify-center bg-base-green p-2 h-10 w-52 md:w-44 border border-black rounded-md space-x-2 hover:bg-black duration-150 hover:text-white ${
            friendStatus ? "hidden" : ""
          }`}
        >
          <UserPlusIcon className="h-5" />
          <p className="font-quicksand font-medium">Add Friend</p>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full px-4">
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </div>
    </div>
  );
};

export default PersonProfileComponent;
