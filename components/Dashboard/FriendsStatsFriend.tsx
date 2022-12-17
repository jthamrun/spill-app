import React from "react";

function FriendsStatsFriend() {
  return (
    <div className="flex items-center font-quicksand cursor-pointer border border-black rounded-md px-2 py-1 space-x-8 min-[760px]:space-x-2 min-[911px]:space-x-8 group hover:bg-black hover:text-white">
      <div className="flex items-center space-x-1">
        <div className="flex bg-base-green h-7 w-7 rounded-full justify-center items-center group-hover:bg-nav-gray">
          <h1 className="font-bold group-hover:text-black">J</h1>
        </div>
        <p className="font-medium min-[760px]:text-sm min-[911px]:text-base">
          Jessica S.
        </p>
      </div>
      <p className="font-bold min-[760px]:text-sm min-[911px]:text-base">
        $ 532.56
      </p>
    </div>
  );
}

export default FriendsStatsFriend;
