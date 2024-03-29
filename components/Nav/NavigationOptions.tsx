"use client";
import { unstable_getServerSession } from "next-auth";
import React, { useState, useRef, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function NavigationOptions({ session }: Props) {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const sideBarRef = useRef<HTMLElement>(null);
    const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300 z-30`;
    const genericSideBar = `transform top-0 right-0 w-80 bg-nav-gray fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 pt-20 md:hidden`;
    // const session = false;

    const handleClickOutsideSideBar = (e: any) => {
        if (isMenuOpen && !sideBarRef.current?.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    };

    const handleClickInsideSideBar = (e: any) => {
        if (isMenuOpen) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideSideBar);
        document.addEventListener("click", handleClickInsideSideBar);

        return () => {
            document.removeEventListener("click", handleClickOutsideSideBar);
            document.removeEventListener("click", handleClickInsideSideBar);
        };
    });

    if (session)
        return (
            <div className="">
                <div className="hidden text-xs min-[785px]:text-sm md:flex md:space-x-10 font-quicksand font-bold">
                    <h1 className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer">
                        Create Expense
                    </h1>
                    <h1 className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer">
                        Past Expenses
                    </h1>
                    <Link href="/search/friends">
                        <h1 className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer">
                            Friends
                        </h1>
                    </Link>
                    <Link href="/search/people">
                        <h1 className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer">
                            Search People
                        </h1>
                    </Link>
                </div>

                <button
                    className="flex flex-col h-10 w-10 rounded justify-center items-center group ml-auto md:hidden"
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
                    <div className="flex flex-col space-y-5 items-start ml-12 font-bold font-quicksand">
                        <button>
                            <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm">
                                Create Expense
                            </p>
                        </button>
                        <button>
                            <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm">
                                Past Expense
                            </p>
                        </button>
                        <Link href="/search/friends">
                            <button>
                                <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm">
                                    Friends
                                </p>
                            </button>
                        </Link>
                        <Link href="/search/people">
                            <button>
                                <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm">
                                    Search People
                                </p>
                            </button>
                        </Link>
                    </div>
                    <button
                        className="ml-12 mt-5"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm font-bold font-quicksand">
                            Sign Out
                        </p>
                    </button>
                </aside>
            </div>
        );

    return (
        <div>
            <button
                className="flex flex-col h-10 w-10 rounded justify-center items-center group ml-auto md:hidden"
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
                <button className="ml-12" onClick={() => signIn()}>
                    <p className="transition duration-150 hover:underline hover:underline-offset-4 cursor-pointer text-sm font-bold">
                        Sign In
                    </p>
                </button>
            </aside>
        </div>
    );
}

export default NavigationOptions;
