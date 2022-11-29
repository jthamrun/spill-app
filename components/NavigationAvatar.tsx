import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

function NavigationAvatar() {
    return (
        <div className="hidden md:flex items-center space-x-1">
            <div>
                <div className="flex bg-nav-gray h-10 w-10 rounded-full justify-center items-center">
                    <h1 className="text-xl font-quicksand font-bold">J</h1>
                </div>
            </div>
            <ChevronDownIcon className="h-5 cursor-pointer hover:text-slate-50 transition duration-150" />
        </div>
    );
}

export default NavigationAvatar;
