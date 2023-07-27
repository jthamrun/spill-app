import { User, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import FirebaseAuthContext from "./firebase-auth-context";

type Props = {
  children?: React.ReactNode;
};

const FirebaseAuthProvider = ({ children }: Props): React.ReactNode => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsub;
  }, []);

  console.log("FirebaseAuthProvider - User:", user);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
