import React from "react";
// import SearchPeopleContent from "../../../components/SearchPeopleBar";
import SearchPerson from "../../../components/SearchPeople/SearchPerson";
import SearchFriendsComponent from "../../../components/SearchFriends/SearchFriendsComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

async function SearchFriendsPage() {
  const session = await getServerSession(authOptions) as any
  return (
    <div className="h-[92vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
      <SearchFriendsComponent session={session}/>
    </div>
  );
}

export default SearchFriendsPage;
