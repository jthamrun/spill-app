import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { unstable_getServerSession } from "next-auth";

import React from "react";
import NavigationAvatar from "./NavigationAvatar";

import NavigationOptions from "./NavigationOptions";

async function MainNavigation() {
  // const session = true;
  // const { data: session } = useSession();
  const session = await unstable_getServerSession();

  return (
    <div className="py-4 px-10 bg-base-green flex items-center justify-between">
      <h1 className="font-quicksand font-bold text-2xl cursor-pointer transition duration-150 hover:text-slate-50">
        spill.
      </h1>
      {/* <NavigationOptions session={session} /> */}
      <NavigationAvatar session={session} />
    </div>
  );
}

export default MainNavigation;
