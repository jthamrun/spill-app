import React from "react";

type Props = {
  name: string;
  addPerson: () => void;
};

function PersonGroupInfoCard({
  name,
  addPerson,
}: Props) {
  return (
    <div
      onClick={() => {
        addPerson();
      }}
      className="flex items-center justify-between rounded-md py-2 px-6 cursor-pointer hover:bg-black duration-150 group"
    >
      <div className="flex items-center space-x-4">
        <div
          className="flex h-10 w-10 rounded-full justify-center items-center bg-base-green group-hover:bg-nav-gray"
        >
          <h1 className="text-xl font-quicksand font-bold">
            {name.split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
          </h1>
        </div>
        <div
          className="font-quicksand group-hover:text-white"
        >
          <h3 className="font-bold">{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default PersonGroupInfoCard;
