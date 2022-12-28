"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase.config";
import SearchPerson from "./SearchPeople/SearchPerson";

type Props = {
  placeholder: string;
};

type User = {
  id?: string;
  email: string;
  name: string;
};

function SearchPeopleContent({ placeholder }: Props) {
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<User[]>([]);

  console.log(search);

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("name", "==", search))
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

  // useEffect(() => {
  //     const unsub = onSnapshot(collection(db, "users"), (querySnapshot) => {
  //         const documents = querySnapshot.docs.map((doc) => {
  //             return {
  //                 ...doc.data(),
  //                 id: doc.id,
  //             };
  //         });
  //         setPeople(documents);
  //     });
  //     return () => unsub();
  // }, []);

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
          <SearchPerson key={person.id} name={person.name} />
        ))}
      </div>

      {/* <SearchPerson name="Jessica Sun" />
        <SearchPerson name="Timothy Thamrun" />
        <SearchPerson name="Tiffany Thamrun" />
        <SearchPerson name="Calvin Ng" /> */}
    </div>
  );
}

export default SearchPeopleContent;
