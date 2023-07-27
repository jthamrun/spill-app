"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { useRouter } from "next/navigation";
import UserContext from "./store/user-context/user-context";

const SignUpComponent = () => {
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
    setEmail(email);
  };

  useEffect(() => {
    isEmailValid && firstName && lastName && password
      ? setIsValid(true)
      : setIsValid(false);
  }, [isEmailValid, firstName, lastName, password]);

  const signUpToFirestore = () => {
    // upload the email and password to firestore if use default authentication
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // OPTIONAL: send a email verification to verify user
        // sendEmailVerification(auth.currentUser).then()
        // add the name of the user to their profile
        updateProfile(auth.currentUser!, {
          displayName: `${firstName} ${lastName}`,
        }).catch((err) => {
          console.log(err);
        });
        // Once created, user will automatically sign in, so go to dashboard
        router.push("/dashboard");
      })
      .catch((err) => {
        // error handling if creating user produces error (error creating, invalid email or password)
        console.log(err);
      });
  };

  return (
    <div key="default" className="grid p-3">
      <h1 className="font-quicksand font-semibold text-4xl text-center mt-5 p-5">
        Be a part of spill.
      </h1>
      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type="text"
        placeholder="First Name"
        className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
      />
      <input
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        type="text"
        placeholder="Last Name"
        className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
      />
      <input
        onChange={(e) => {
          validateEmail(e.target.value);
        }}
        type="email"
        placeholder="Email"
        className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
        className="font-quicksand font-medium border-2 border-black rounded-md my-2 py-2 pl-4 pr-8 hover:-translate-y-0.5 duration-150 ease-out"
      />
      <button
        onClick={() => {
          signUpToFirestore();
        }}
        disabled={!isValid}
        className="disabled:bg-gray-500 disabled:border-gray-200 font-quicksand font-bold border-2 border-green-200 rounded-md bg-base-green text-white py-2 my-2 hover:-translate-y-0.5 duration-150 ease-out"
      >
        Sign Up
      </button>
      <Link href="/auth/signin">
        <p className="font-quicksand font-semibold text-center">
          Have an account already? Sign in
        </p>
      </Link>
    </div>
  );
};

export default SignUpComponent;
