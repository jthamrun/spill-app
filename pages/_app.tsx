import FirebaseAuthProvider from "../components/store/auth-context/firebaseAuthProvider";
import LoadingProvider from "../components/store/loading-context/loadingProvider";
import UserProvider from "../components/store/user-context/userProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
