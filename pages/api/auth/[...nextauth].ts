import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { User, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Credentials({
    //     name: 'Credentials',
    //     credentials: {
    //         email: { label: 'Email', type: 'email', placeholder: 'example@domain.com'},
    //         password: { label: "Password", type: "Password"}
    //     },
    //     async authorize(credentials, req){
    //       let user;
    //         const auth = getAuth();
    //         signInWithEmailAndPassword(auth, credentials?.email as string, credentials?.password as string).then(userCredential => {
    //             // This indicates that user has signed in
    //             user = {
    //                 id: userCredential.user.uid,
    //                 name: userCredential.user.displayName,
    //                 email: userCredential.user.email,

    //             }
    //         }).catch((err) => {
    //             user = null;
    //         })
    //         return Promise.resolve(user)
    //     }
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: FirestoreAdapter({
    // need to setup service account for Firebase and store ID in env file for authentication to work
    apiKey: "AIzaSyBnEz6whEnAfhijRN3dLS7AiYfU6zt54O8",
    authDomain: "spill-app-76ebc.firebaseapp.com",
    projectId: "spill-app-76ebc",
    storageBucket: "spill-app-76ebc.appspot.com",
    messagingSenderId: "772176048598",
    appId: "1:772176048598:web:c96e51044530372f56f477",
    measurementId: "G-F891V5PP6Z",
  }),
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      // set a new friend document for the current user
      console.log("Token:", token);
      // not working
      await getDocs(
        query(collection(db, "friends"), where("__name__", "==", token.sub))
      ).then(async (data) => {
        
        data.empty &&
          (await setDoc(doc(db, `friends/${token.sub}`), {
            users: [],
          }));
      });

      return token;
    },
  },
});

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: FirestoreAdapter({
    // need to setup service account for Firebase and store ID in env file for authentication to work
    apiKey: "AIzaSyBnEz6whEnAfhijRN3dLS7AiYfU6zt54O8",
    authDomain: "spill-app-76ebc.firebaseapp.com",
    projectId: "spill-app-76ebc",
    storageBucket: "spill-app-76ebc.appspot.com",
    messagingSenderId: "772176048598",
    appId: "1:772176048598:web:c96e51044530372f56f477",
    measurementId: "G-F891V5PP6Z",
  }),
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
};
