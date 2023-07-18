"use client";
import { getProviders, signIn } from "next-auth/react";
import { useRef, useState } from "react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const uploadToFirestore = () => {
    // upload the email and password to firestore if use default authentication
    console.log(emailRef.current!.value, passwordRef.current!.value)
  }

  return (
    <div className="grid divide-y divide-black place-items-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="border-2 border-black rounded-md m-5 py-2 px-8 hover:-translate-y-0.5 duration-150 ease-out"
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
      <div key="default" className="grid p-3">
        <input type="email" placeholder="Email" ref={emailRef} className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"/>
      { !isPasswordHidden &&
        <input type="password" placeholder="Password" ref={passwordRef} className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"/>
        }
      <button onClick={() => {
        isPasswordHidden ? setIsPasswordHidden(false) : uploadToFirestore()
        }} className="font-quicksand font-bold border-2 border-blue-200 rounded-md bg-blue-600 text-white py-2 my-2">{isPasswordHidden ? "Continue" : "Sign In"}</button>
      </div>
    </div>
  );
}

export default SignInComponent;
