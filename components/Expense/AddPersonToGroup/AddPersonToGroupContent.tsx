"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import PersonGroupInfoCard from "./PersonGroupInfoCard";
import { ExpenseItemGroup, User, UserExpenseGroup } from "../../store/types";
import { db } from "../../../firebase.config";

type Props = {
  placeholder: string;
  group: ExpenseItemGroup;
  setGroup: Dispatch<SetStateAction<ExpenseItemGroup>>;
};

function AddPersonToGroupContent({ placeholder, group, setGroup }: Props) {
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<User[]>([]);

  const addPerson = (id: string, name: string) => {
    setGroup((prev) => {
      let arr = prev.splitAmount ?? [];
      arr.push({
        user_id: id,
        name,
        total_amount: 12.99,
      } as UserExpenseGroup);
      return {
        ...prev,
        splitAmount: arr,
      };
    });
  };

  const removePerson = (id: string) => {
    setGroup((prev) => {
      return {
        ...prev,
        splitAmount: prev.splitAmount?.filter((user) => user.user_id !== id),
      };
    });
  };

  // console.log(search);

  useEffect(() => {
    const getAllUsers = async () => {
      const searchArr = search.split(" ");

      for (var i = 0; i < searchArr.length; i++) {
        searchArr[i] =
          searchArr[i].charAt(0).toUpperCase() + searchArr[i].slice(1);
      }

      const searchMod = searchArr.join(" ");

      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("name", ">=", searchMod),
          where("name", "<=", searchMod + "\uf8ff"),
          limit(10)
        )
      );
      const users: Array<User> = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
        });
      });
      setPeople(users);
    };

    getAllUsers();
  }, [search]);

  return (
    <div>
      <div className="flex items-center p-2 h-10 w-full rounded-md px-4 space-x-2 border border-black focus-within:ring-1 focus-within:ring-black">
        <input
          className="font-quicksand text-black focus:outline-none w-full"
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="h-5" />
      </div>
      <div className="mt-4 space-y-3">
        {people.map((person, index) => (
          <PersonGroupInfoCard
            key={index}
            isSelected={
              group.splitAmount?.some((user) => user.user_id === person.id) ??
              false
            }
            addPerson={() => {
              addPerson(person.id!, person.name);
            }}
            removePerson={() => {
              removePerson(person.id!);
            }}
            name={person.name}
          />
        ))}
      </div>
      <div className="pt-6 flex flex-row space-x-10 overflow-x-auto">
        {group.splitAmount?.map((user) => {
          return (
            // need to add logic to edit the amount in splitAmount
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 rounded-full justify-center items-center bg-base-green">
                <h1 className="text-2xl font-quicksand font-bold">
                  {user.name
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")}
                </h1>
              </div>
              <div className="flex mt-2 w-32">
                <p className="px-1 w-6/12 border border-transparent border-r-0 rounded-l-md text-left bg-base-green">Amount</p>
                <input
                  className="px-1 w-6/12 font-quicksand text-black text-center focus:outline-none border border-l-0 border-base-green rounded-r-md"
                  type="text"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddPersonToGroupContent;
