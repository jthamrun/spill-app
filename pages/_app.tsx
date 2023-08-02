import FirebaseAuthProvider from "../components/store/auth-context/firebaseAuthProvider";
import UserProvider from "../components/store/user-context/userProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
