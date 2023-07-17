import React from "react";
import { signIn } from "next-auth/react";
import HomeSignInButton from "../components/Nav/HomeSignInButton";
import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession();
  console.log(session?.user)

  return (
    <div className="flex items-center justify-center h-96">
      <HomeSignInButton session={session} />
    </div>
  );
}

export default Home;
