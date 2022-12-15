import React from "react";
import FriendsStatsFriend from "./FriendsStatsFriend";

function FriendsStatsDashboard() {
  return (
    <div className="border border-black row-span-5 md:col-span-1 md:row-span-3 rounded-md flex flex-col px-4 py-1">
      <h3 className="font-quicksand font-bold text-sm md:text-lg">Friends</h3>
      <div className="flex h-full">
        <div className="m-auto flex flex-col space-y-2">
          <FriendsStatsFriend />
          <FriendsStatsFriend />
          <FriendsStatsFriend />
        </div>
      </div>
    </div>
  );
}

export default FriendsStatsDashboard;
