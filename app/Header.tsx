"use client";

import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useRef } from "react";
import { type } from "os";

function Header() {
  const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300`;
  const genericSideBar = `transform top-0 right-0 w-80 bg-gray-500 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 pt-20 md:hidden`;
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLElement>(null);

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
    <header className="flex py-4 px-10 bg-base-green space-x-10 items-center justify-between">
      <aside
        className={`${genericSideBar} ${
          isMenuOpen ? "-translate-x-0" : "translate-x-full"
        }`}
        ref={sideBarRef}
      >
        <div className="flex flex-col space-y-5 items-start ml-12">
          <button>
            <p>Create Expense</p>
          </button>
          <button>
            <p>Past Expense</p>
          </button>
          <button>
            <p>Friends</p>
          </button>
          <button>
            <p>Search People</p>
          </button>
        </div>
      </aside>

      <h1 className="font-quicksand font-bold text-2xl cursor-pointer transition duration-150 hover:text-slate-50">
        spill.
      </h1>
      <div className="hidden text-xs min-[785px]:text-sm md:flex md:space-x-10 font-quicksand font-bold">
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
      <div className="hidden md:flex md:space-x-1 md:items-center">
        <div>
          <div className="flex bg-nav-gray h-10 w-10 rounded-full justify-center items-center">
            <h1 className="text-xl font-quicksand font-bold">J</h1>
          </div>
        </div>
        <ChevronDownIcon className="h-5 cursor-pointer" />
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
    </header>
  );
}

export default Header;
