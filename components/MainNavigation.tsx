import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import NavigationAvatar from "./NavigationAvatar";

import NavigationOptions from "./NavigationOptions";

function MainNavigation() {
    // const session = true;
    // const { data: session } = useSession();

    return (
        <div className="py-4 px-10 bg-base-green flex items-center justify-between">
            <h1 className="font-quicksand font-bold text-2xl cursor-pointer transition duration-150 hover:text-slate-50">
                spill.
            </h1>
            <NavigationOptions />
            <NavigationAvatar />
        </div>
    );
}

export default MainNavigation;
