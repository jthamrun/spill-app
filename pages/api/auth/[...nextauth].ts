import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyBnEz6whEnAfhijRN3dLS7AiYfU6zt54O8",
    authDomain: "spill-app-76ebc.firebaseapp.com",
    projectId: "spill-app-76ebc",
    storageBucket: "spill-app-76ebc.appspot.com",
    messagingSenderId: "772176048598",
    appId: "1:772176048598:web:c96e51044530372f56f477",
    measurementId: "G-F891V5PP6Z",
  }),
  //   pages: {
  //     signIn: "/auth/signin",
  //   },
  // ...
});
