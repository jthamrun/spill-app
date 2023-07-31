import { getServerSession } from "next-auth";
import React, { useContext } from "react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import FirebaseAuthContext from "../store/auth-context/firebase-auth-context";

type Props = {
  name: string
}

const WelcomeCard = (props: Props) => {
  return (
    <div className="row-span-1 col-span-9 md:col-span-1 md:row-span-1 px-4 py-1">
      <h1 className="font-quicksand font-bold text-2xl md:text-4xl">
        {props.name ? `Welcome back, ${props.name}!` : "Welcome!"}
      </h1>
    </div>
  );
};

export default WelcomeCard;