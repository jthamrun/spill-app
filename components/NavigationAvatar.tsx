"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import { signIn, signOut } from "next-auth/react";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function NavigationAvatar({ session }: Props) {
  console.log(session);

  if (session)
    return (
      <div>
        <button
          className="cursor-pointer font-quicksand font-bold hover:bg-nav-gray p-2 rounded-md"
          onClick={() => signOut()}
        >
          <p>Sign Out</p>
        </button>
      </div>
      // <div className="hidden md:flex items-center space-x-1">
      //   <div>
      //     <div className="flex bg-nav-gray h-10 w-10 rounded-full justify-center items-center">
      //       <h1 className="text-xl font-quicksand font-bold">J</h1>
      //     </div>
      //   </div>
      //   <ChevronDownIcon className="h-5 cursor-pointer hover:text-slate-50 transition duration-150" />
      // </div>
    );

  return (
    <div>
      <button
        className="cursor-pointer font-quicksand font-bold hover:bg-nav-gray p-2 rounded-md"
        onClick={() => signIn()}
      >
        <p>Sign In</p>
      </button>
      <button
        className="cursor-pointer font-quicksand font-bold hover:bg-nav-gray p-2 rounded-md"
        onClick={() => signOut()}
      >
        <p>Sign Out</p>
      </button>
    </div>
  );
}

export default NavigationAvatar;
