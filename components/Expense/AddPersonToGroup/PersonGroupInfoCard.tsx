import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  name: string;
  isSelected: boolean;
  addPerson: () => void;
  removePerson: () => void;
};

function PersonGroupInfoCard({
  name,
  isSelected,
  addPerson,
  removePerson,
}: Props) {
  const [selected, setSelected] = useState<boolean>(isSelected);

  return (
    <div
      onClick={() => {
        selected ? removePerson() : addPerson();
        setSelected((prev) => !prev);
      }}
      className={`flex items-center justify-between rounded-md py-2 px-6 cursor-pointer ${
        selected
          ? "bg-black hover:bg-white duration-150 group"
          : "hover:bg-black duration-150 group"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`flex h-10 w-10 rounded-full justify-center items-center ${
            selected
              ? "bg-nav-gray group-hover:bg-base-green"
              : "bg-base-green group-hover:bg-nav-gray"
          }`}
        >
          <h1 className="text-xl font-quicksand font-bold">
            {name.split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
          </h1>
        </div>
        <div
          className={`${
            selected
              ? "text-white group-hover:text-black"
              : "group-hover:text-white"
          } font-quicksand `}
        >
          <h3 className="font-bold">{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default PersonGroupInfoCard;
