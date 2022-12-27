"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase.config";

type Props = {
    placeholder: string;
};

function SearchPeopleBar({ placeholder }: Props) {
    const [search, setSearch] = useState("");
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            setPeople(documents);
        });
        return () => unsub();
    }, []);

    console.log(people);

    return (
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
    );
}

export default SearchPeopleBar;
