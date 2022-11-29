"use client";

import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useRef } from "react";
import { signIn, signOut } from "next-auth/react";
// import { unstable_getServerSession } from "next-auth/next";

function MainNavigation() {
  const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300`;
  const genericSideBar = `transform top-0 right-0 w-80 bg-nav-gray fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 pt-20 md:hidden`;
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLElement>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  // const session = await unstable_getServerSession();

  // console.log(session);

  const handleClickOutsideSideBar = (e: any) => {
    if (isMenuOpen && !sideBarRef.current?.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSideBar);

    return () => {
      document.removeEventListener("click", handleClickOutsideSideBar);
    };
  });

  return (
    <div className="flex py-4 px-10 bg-base-green space-x-10 items-center justify-between">
      <h1 className="font-quicksand font-bold text-2xl cursor-pointer transition duration-150 hover:text-slate-50">
        spill.
      </h1>
      <div
        className={`${
          isSignedIn
            ? "hidden text-xs min-[785px]:text-sm md:flex md:space-x-10 font-quicksand font-bold"
            : "hidden"
        }`}
      >
        <h1 className="transition duration-150 hover:text-slate-50 cursor-pointer">
          Create Expense
        </h1>
        <h1 className="transition duration-150 hover:text-slate-50 cursor-pointer">
          Past Expenses
        </h1>
        <h1 className="transition duration-150 hover:text-slate-50 cursor-pointer">
          Friends
        </h1>
        <h1 className="transition duration-150 hover:text-slate-50 cursor-pointer">
          Search People
        </h1>
      </div>

      <div className="hidden md:flex md:space-x-5">
        <button
          className={`${
            isSignedIn
              ? "hidden"
              : "hover:bg-nav-gray hover:rounded-md py-1 px-2 font-bold font-quicksand"
          }`}
          onClick={() => signIn()}
        >
          <p>Sign In</p>
        </button>

        <div
          className={`${isSignedIn ? "flex items-center space-x-1" : "hidden"}`}
        >
          <div>
            <div className="flex bg-nav-gray h-10 w-10 rounded-full justify-center items-center">
              <h1 className="text-xl font-quicksand font-bold">J</h1>
            </div>
          </div>
          <ChevronDownIcon className="h-5 cursor-pointer hover:text-slate-50 transition duration-150" />
        </div>
      </div>

      <button
        className="flex flex-col h-10 w-10 rounded justify-center items-center group ml-auto md:hidden z-30"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isMenuOpen
              ? "rotate-45 translate-y-2 opacity-50 group-hover:opacity-100"
              : "group-hover:opacity-50"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isMenuOpen ? "opacity-0" : "group-hover:opacity-50"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isMenuOpen
              ? "-rotate-45 -translate-y-2 opacity-50 group-hover:opacity-100"
              : "group-hover:opacity-50"
          }`}
        />
      </button>

      <aside
        className={`${genericSideBar} ${
          isMenuOpen ? "-translate-x-0" : "translate-x-full"
        }`}
        ref={sideBarRef}
      >
        <div
          className={`${
            isSignedIn ? "flex flex-col space-y-5 items-start ml-12" : "hidden"
          }`}
        >
          <button>
            <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
              Create Expense
            </p>
          </button>
          <button>
            <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
              Past Expense
            </p>
          </button>
          <button>
            <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
              Friends
            </p>
          </button>
          <button>
            <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
              Search People
            </p>
          </button>
        </div>
        <button className={`${isSignedIn ? "ml-12 mt-5" : "hidden"}`}>
          <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
            Sign Out
          </p>
        </button>
        <button className={`${isSignedIn ? "hidden" : "ml-12"}`}>
          <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
            Sign In
          </p>
        </button>
      </aside>
    </div>
  );
}

export default MainNavigation;
