import React from "react";
import HomeSignInButton from "../components/Nav/HomeSignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user)

  return (
    <div className="flex items-center justify-center h-96">
      <HomeSignInButton session={session} />
    </div>
  );
}

export default Home;
