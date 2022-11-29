"use client";
import React, { useState, useRef, useEffect } from "react";

function NavigationOptions() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const sideBarRef = useRef<HTMLElement>(null);
    const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300`;
    const genericSideBar = `transform top-0 right-0 w-80 bg-nav-gray fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 pt-20 md:hidden`;
    const session = true;

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

    if (session)
        return (
            <div className="">
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

                {/* <button
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
                    <div className="flex flex-col space-y-5 items-start ml-12">
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
                    <button className="ml-12 mt-5">
                        <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
                            Sign Out
                        </p>
                    </button>
                </aside> */}
            </div>
        );

    return (
        <div>
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
                <button className="ml-12">
                    <p className="transition duration-150 hover:text-green-600 cursor-pointer text-sm">
                        Sign In
                    </p>
                </button>
            </aside>
        </div>
    );
}

export default NavigationOptions;
