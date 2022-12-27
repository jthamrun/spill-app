import React from "react";
import SearchPeopleBar from "../../../components/SearchPeopleBar";
import SearchPerson from "../../../components/SearchPeople/SearchPerson";

function SearchPeoplePage() {
    return (
        <div className="h-[92vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
            <div className="flex flex-col items-center border border-black rounded-md">
                <h3 className="font-quicksand text-2xl font-bold py-4">
                    Search People
                </h3>
                <div className="h-[1px] bg-black w-full"></div>
                <div className="w-full p-4">
                    <SearchPeopleBar placeholder="Search People, @username" />
                    <div className="mt-4 space-y-3">
                        {/* <SearchPerson name="Jessica Sun" />
                        <SearchPerson name="Timothy Thamrun" />
                        <SearchPerson name="Tiffany Thamrun" />
                        <SearchPerson name="Calvin Ng" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPeoplePage;
