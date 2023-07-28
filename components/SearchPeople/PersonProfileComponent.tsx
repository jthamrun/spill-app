import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { User } from "../store/types";

type Props = {
  id: string;
};

const PersonProfileComponent = ({ id }: Props) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    const getProfile = async () => {
      await getDocs(
        query(collection(db, "users"), where("__name__", "==", id))
      ).then((doc) => {
        doc.forEach((d) => {
          const data = d.data();
          setUser({ id: d.id, name: data.name, email: data.email });
        });
      });
    };
    id && getProfile()
  }, [id]);
  return (
    <div className="flex flex-col items-center border border-black rounded-md">
      <div className="text-center py-1.5">
        <h3 className="font-quicksand text-2xl font-bold">{user.id!}</h3>
      </div>
      <div className="h-[1px] bg-black w-full"></div>
      <div className="w-full p-4">
        <div className="font-quicksand text-lg mt-4 space-y-3">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonProfileComponent;
