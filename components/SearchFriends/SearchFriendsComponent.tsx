"use client";
import { useEffect, useState } from "react";
import SearchPerson from "../SearchPeople/SearchPerson";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { User } from "../store/types";
import Link from "next/link";

type Props = {
  session: any;
};

const SearchFriendsComponent = ({ session }: Props) => {
  const [friends, setFriends] = useState<User[]>([]);

  const getAllFriends = async () => {
    // set loading icon to true

    const querySnapshot = await getDocs(
      query(collection(db, "friends"), where("__name__", "==", session.user.id))
    );
    let friendsList: string[] = [];
    let friendsArr: User[] = [];
    // get all the friends from the user

    querySnapshot.forEach((doc) => {
      friendsList = doc.data().users;
    });

    await Promise.all(
      friendsList?.map(async (e: string) => {
        await getDocs(
          query(collection(db, "users"), where("__name__", "==", e.trim()))
        ).then((data) =>
          data.forEach((doc) => {
            friendsArr.push({
              id: doc.id,
              email: doc.data().email,
              name: doc.data().name,
            });
          })
        );
      })
    );
    //set loading icon to false

    setFriends(friendsArr);
  };

  //listen if any friends are added to the current user
  const unsub = onSnapshot(doc(db, "friends", session.user.id), () => {
    getAllFriends();
  });

  useEffect(() => {
    // when this page initially load
    // fetch users that are friends with this user, using user id
    getAllFriends();
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex flex-col items-center border border-black rounded-md">
      <div className="text-center py-1.5">
        <h3 className="font-quicksand text-2xl font-bold">Friends</h3>
        {friends.length != 0 && (
          <p className="text-sm">
            <span className="font-bold">{friends.length}</span> Friends
          </p>
        )}
      </div>

      <div className="h-[1px] bg-black w-full"></div>
      <div className="w-full p-4">
        {/* <SearchPeopleContent placeholder="Search Friends" /> */}
        <div className="mt-4 space-y-3">
          {friends.map((friend, idx) => (
            <SearchPerson
              key={idx}
              href={"/search/friends/" + friend.id}
              name={friend.name}
              email={friend.email}
            />
          ))}
          {/* <SearchPerson name="Jessica Sun" />
    <SearchPerson name="Timothy Thamrun" />
    <SearchPerson name="Tiffany Thamrun" />
    <SearchPerson name="Calvin Ng" /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchFriendsComponent;
