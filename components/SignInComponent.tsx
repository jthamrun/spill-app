"use client";
import { getProviders, signIn } from "next-auth/react";

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
    return (
        <div>
            {Object.values(providers!).map((provider) => (
                <div key={provider.name}>
                    <button
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: "http://localhost:3000",
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SignInComponent;
