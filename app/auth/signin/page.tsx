import { getProviders, signIn } from "next-auth/react";
import SignInComponent from "../../../components/SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center h-96">
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
