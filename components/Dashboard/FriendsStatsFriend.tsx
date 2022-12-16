import React from "react";

function FriendsStatsFriend() {
  return (
    <div className="flex items-center font-quicksand  border border-black rounded-md px-2 py-1 space-x-8 min-[760px]:space-x-2 min-[911px]:space-x-8">
      <div className="flex items-center space-x-1">
        <div className="flex bg-base-green h-7 w-7 rounded-full justify-center items-center">
          <h1 className="font-bold">J</h1>
        </div>
        <p className="font-medium min-[760px]:text-sm min-[911px]:text-base">
          Jessica Sun
        </p>
      </div>
      <p className="font-bold min-[760px]:text-sm min-[911px]:text-base">
        $ 532.56
      </p>
    </div>
  );
}

export default FriendsStatsFriend;
