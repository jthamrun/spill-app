// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import React from "react";
import Link from "next/link";
import NavigationAvatar from "./NavigationAvatar";
import NavigationOptions from "./NavigationOptions";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

async function MainNavigation() {
    const session = await getServerSession(authOptions);

    return (
        <div className="py-4 px-10 bg-base-green flex items-center justify-between h-[8vh]">
            <Link href="/">
                <h1 className="font-quicksand font-bold text-2xl cursor-pointer transition duration-150 hover:text-slate-50">
                    spill.
                </h1>
            </Link>
            <NavigationOptions session={session} />
            <NavigationAvatar session={session} />
        </div>
    );
}

export default MainNavigation;
