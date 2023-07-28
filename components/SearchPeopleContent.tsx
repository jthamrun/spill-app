"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { db } from "../firebase.config";
import SearchPerson from "./SearchPeople/SearchPerson";
import { User } from "./store/types";

type Props = {
  placeholder: string;
};

function SearchPeopleContent({ placeholder }: Props) {
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<User[]>([]);

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
          className="font-quicksand text-search-bar-gray focus:outline-none w-full"
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
          <SearchPerson
            href={'/search/people/' + person.id}
            key={index}
            name={person.name}
            email={person.email}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPeopleContent;
