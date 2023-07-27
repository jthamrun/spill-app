"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { auth } from "../firebase.config";
import UserContext from "./store/user-context/user-context";
import { useRouter } from "next/navigation";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
  const router = useRouter()

  // const userCtx = useContext(UserContext)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
    setEmail(email);
  };

  const uploadToFirestore = () => {
    // upload the email and password to firestore if use default authentication
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        router.push('/dashboard')
      }
    ).catch(err => {
      // error handling if signing in user produces error (invalid email or password)
      console.log(err);
      
    });
  };

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
      {/* <div key="default" className="grid p-3">
        <input
          onChange={(e) => {
            validateEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
        />
        {!isPasswordHidden && (
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
          />
        )}
        <button
          onClick={() => {
            isPasswordHidden ? setIsPasswordHidden(false) : uploadToFirestore();
          }}
          disabled={!isEmailValid}
          className="disabled:bg-gray-500 disabled:border-gray-200 font-quicksand font-bold border-2 border-green-200 rounded-md bg-base-green text-white py-2 my-2"
        >
          {isPasswordHidden ? "Continue" : "Sign In"}
        </button>
        <Link href="/auth/signup">
          <p className="font-quicksand font-semibold">
            Don't have an account? Sign up now
          </p>
        </Link>
      </div> */}
    </div>
  );
}

export default SignInComponent;
