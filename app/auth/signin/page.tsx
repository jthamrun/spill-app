import { getProviders, signIn } from "next-auth/react";
import SignInComponent from "../../../components/SignInComponent";

async function SignInPage() {
    const providers = await getProviders();

    return (
        <div>
            <SignInComponent providers={providers} />
        </div>
    );
}

export default SignInPage;
