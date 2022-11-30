// "use client";

import React from "react";
import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <div>
      <button onClick={() => signIn()}>
        <p>Sign In</p>
      </button>
    </div>
  );
}

export default SignInButton;
