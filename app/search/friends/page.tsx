import React from "react";
import SearchPeopleBar from "../../../components/SearchPeopleBar";
import SearchPerson from "../../../components/SearchPeople/SearchPerson";

function SearchFriendsPage() {
    return (
        <div className="h-[92vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
            <div className="flex flex-col items-center border border-black rounded-md">
                <div className="text-center py-1.5">
                    <h3 className="font-quicksand text-2xl font-bold">
                        Friends
                    </h3>
                    <p className="text-sm">
                        <span className="font-bold">4</span> Friends
                    </p>
                </div>

                <div className="h-[1px] bg-black w-full"></div>
                <div className="w-full p-4">
                    <SearchPeopleBar placeholder="Search Friends" />
                    <div className="mt-4 space-y-3">
                        <SearchPerson name="Jessica Sun" />
                        <SearchPerson name="Timothy Thamrun" />
                        <SearchPerson name="Tiffany Thamrun" />
                        <SearchPerson name="Calvin Ng" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFriendsPage;
