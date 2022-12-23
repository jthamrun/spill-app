import React from "react";
import SearchBar from "../../../components/SearchBar";

function SearchPeoplePage() {
  return (
    <div className="h-[90vh] xl:h-[93vh] px-10 py-5 grid overflow-auto xl:max-w-5xl m-auto">
      <div className="flex flex-col items-center border border-black rounded-md">
        <h3 className="font-quicksand text-2xl font-bold py-4">
          Search People
        </h3>
        <div className="h-[1px] bg-black w-full"></div>
        <div className="w-full p-4">
          <SearchBar placeholder="Search People, @username" />
        </div>
      </div>
    </div>
  );
}

export default SearchPeoplePage;
