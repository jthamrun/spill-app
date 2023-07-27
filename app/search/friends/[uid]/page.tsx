"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FriendProfileComponent from "../../../../components/SearchFriends/FriendProfileComponent";

const FriendProfilePage = () => {
  const searchParams = usePathname()!
  
  // const { uid } = router.query;
  // const [id, setID] = useState("")

  // useEffect(() => {
  //   uid && setID(uid as string)
  // }, [uid])

  return <FriendProfileComponent id={searchParams.split('/').pop() as string} />
};

export default FriendProfilePage;
