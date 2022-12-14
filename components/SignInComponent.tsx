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
            className="border-2 border-black rounded-md py-2 px-8 hover:-translate-y-0.5 duration-150 ease-out"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/dashboard",
              })
            }
          >
            <p className="font-quicksand font-bold text-md md:text-lg">
              Continue with {provider.name}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
