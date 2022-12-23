"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type Props = {
  placeholder: string;
};

function SearchBar({ placeholder }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div
      className={`flex items-center p-2 h-10 w-full rounded-md px-4 space-x-2 border border-black`}
    >
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

export default SearchBar;
