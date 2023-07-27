import React from "react";
import FriendsStatsFriend from "./FriendsStatsFriend";
import Link from "next/link";

function FriendsStatsDashboard() {
  return (
    <div className="border border-black row-span-5 md:col-span-1 md:row-span-3 rounded-md flex flex-col px-3 py-1">
      <div>
        <Link href="search/friends">
          <h3 className="font-quicksand font-bold text-sm md:text-lg float-left">
            Friends
          </h3>
        </Link>

        <Link href="/search/people">
          <button className="font-quicksand font-semibold text-sm md:text-xl float-right">
            +
          </button>
        </Link>
      </div>
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
