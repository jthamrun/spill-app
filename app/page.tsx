import React from "react";
import { signIn } from "next-auth/react";
import HomeSignInButton from "../components/HomeSignInButton";
import { unstable_getServerSession } from "next-auth";

async function Home() {
  const session = await unstable_getServerSession();

  return (
    <div className="flex items-center justify-center h-96">
      <HomeSignInButton session={session} />
    </div>
  );
}

export default Home;
