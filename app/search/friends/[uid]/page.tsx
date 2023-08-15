"use client";
import { useParams } from "next/navigation";
import FriendProfileComponent from "../../../../components/SearchFriends/FriendProfileComponent";

const FriendProfilePage = () => {
  const params = useParams()!;

  return (
    <div className="h-[72vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
      <FriendProfileComponent id={params.uid as string} />
    </div>
  );
};

export default FriendProfilePage;
