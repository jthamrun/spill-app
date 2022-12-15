import React from "react";

function FriendsStatsFriend() {
  return (
    <div className="flex items-center font-quicksand  border border-black rounded-md px-2 py-1 space-x-8">
      <div className="flex items-center space-x-1">
        <div className="flex bg-base-green h-7 w-7 rounded-full justify-center items-center">
          <h1 className="font-bold">J</h1>
        </div>
        <p className="font-medium">Jessica Sun</p>
      </div>
      <p className="font-bold">$ 532.56</p>
    </div>
  );
}

export default FriendsStatsFriend;
