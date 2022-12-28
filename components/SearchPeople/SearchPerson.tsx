import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  name: string;
  email: string;
};

function SearchPerson({ name, email }: Props) {
  return (
    <div className="flex items-center justify-between border border-black rounded-md py-2 px-6 cursor-pointer hover:bg-black duration-150 group">
      <div className="flex items-center space-x-4">
        <div className="flex bg-base-green h-10 w-10 rounded-full justify-center items-center group-hover:bg-nav-gray">
          <h1 className="text-xl font-quicksand font-bold">
            {Array.from(`${name}`)[0]}
          </h1>
        </div>
        <div className="group-hover:text-white font-quicksand ">
          <h3 className="font-bold">{name}</h3>
          <h5 className="text-sm">{email}</h5>
        </div>
      </div>
      <ChevronRightIcon className="h-5 group-hover:text-white" />
    </div>
  );
}

export default SearchPerson;
