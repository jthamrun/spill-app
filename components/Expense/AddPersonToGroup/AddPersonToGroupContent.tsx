"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import PersonGroupInfoCard from "./PersonGroupInfoCard";
import { ExpenseItemGroup, User, UserExpenseGroup } from "../../store/types";
import { db } from "../../../firebase.config";
import PersonGroupInfoCarouselCard from "./PersonGroupInfoCarouselCard";

type Props = {
  placeholder: string;
  group: ExpenseItemGroup;
  setGroup: Dispatch<SetStateAction<ExpenseItemGroup>>;
};

function AddPersonToGroupContent({ placeholder, group, setGroup }: Props) {
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<User[]>([]);

  const addPerson = (id: string, name: string) => {
    setPeople((prev) => prev.filter((user) => user.id !== id));
    setGroup((prev) => {
      let arr = prev.splitAmount ?? [];
      arr.push({
        user_id: id,
        name,
        total_amount: 0,
      } as UserExpenseGroup);
      return {
        ...prev,
        splitAmount: arr,
      };
    });
  };

  const removePerson = (id: string, name: string) => {
    setPeople((prev) => {
      return [
        ...prev,
        {
          id,
          email: "",
          name,
        },
      ];
    });
    setGroup((prev) => {
      return {
        ...prev,
        splitAmount: prev.splitAmount?.filter((user) => user.user_id !== id),
      };
    });
  };

  const updateUserGroupAmount = (id: string, amount: number) => {
    setGroup((prev) => {
      let userGroupList = prev.splitAmount?.map((user) => {
        if (user.user_id === id) {
          return {
            ...user,
            total_amount: amount,
          };
        }
        return user;
      });

      return {
        ...prev,
        splitAmount: userGroupList,
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
        if (!group.splitAmount?.some((user) => user.user_id === doc.id)) {
          users.push({
            id: doc.id,
            email: "",
            name: doc.data().name,
          });
        }
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
      <div
        className={`mt-4 space-y-3 ${
          people.length == 0 ? "h-[50px]" : "h-[300px]"
        }`}
      >
        {people.length == 0 ? (
          <p className="font-quicksand font-semibold text-center">
            There's nothing here...
          </p>
        ) : (
          people.map((person, index) => (
            <PersonGroupInfoCard
              key={index}
              addPerson={() => {
                addPerson(person.id!, person.name);
              }}
              name={person.name}
            />
          ))
        )}
      </div>
      <div className="pt-6 grid grid-cols-2 min-[900px]:grid-cols-3 overflow-x-auto gap-y-8">
        {group.splitAmount?.map((user) => {
          return (
            <PersonGroupInfoCarouselCard
              name={user.name}
              totalAmount={user.total_amount}
              disableAmount={group.splitOption === "equal"}
              removePerson={() => {
                removePerson(user.user_id, user.name);
              }}
              updateUserGroupAmount={(total_amount: number) => {
                updateUserGroupAmount(user.user_id, total_amount);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddPersonToGroupContent;
