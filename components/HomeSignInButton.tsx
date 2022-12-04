"use client";
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function HomeSignInButton({ session }: Props) {
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/dashboard")
        }
    }, [session])

    return (
        <div>
            {!session && (
                <button className="font-quicksand font-bold text-4xl hover:bg-base-green p-4 rounded-md" onClick={() => signIn()}>Sign In Now</button>
            )}
        </div>
            
    )
}

export default HomeSignInButton