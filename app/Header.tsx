"use client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";

function Header() {
  const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300`;
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex py-4 px-10 bg-base-green space-x-10 items-center justify-between">
      <h1 className="font-quicksand font-bold text-2xl">spill.</h1>
      <div className="hidden text-sm min-[795px]:text-base md:flex md:space-x-10 font-quicksand font-bold">
        <h1>Create Expense</h1>
        <h1>Past Expenses</h1>
        <h1>Friends</h1>
        <h1>Search People</h1>
      </div>
      <div className="hidden md:flex md:space-x-1 md:items-center">
        <div>
          <div className="flex bg-nav-gray h-10 w-10 rounded-full justify-center items-center">
            <h1 className="text-xl font-quicksand font-bold">J</h1>
          </div>
        </div>
        <ChevronDownIcon className="h-5" />
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
