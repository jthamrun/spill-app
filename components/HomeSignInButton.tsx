"use client";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function HomeSignInButton({ session }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div>
      {!session && (
        <button
          className=" border-2 border-black p-4 rounded-md hover:-translate-y-0.5 duration-150 ease-out"
          onClick={() => signIn()}
        >
          <p className="font-quicksand font-bold text-xl md:text-3xl">
            Sign In Now
          </p>
        </button>
      )}
    </div>
  );
}

export default HomeSignInButton;
