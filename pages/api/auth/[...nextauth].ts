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
    adapter: FirestoreAdapter({ // need to setup service account for Firebase and store ID in env file for authentication to work
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
    // callbacks: { session() is not invoked (because we don't use getSession())  and jwt() is not used since by default all user information is already passed to session
    //     async session({ session, user}: any) {
    //         // Persists the user's id (name) to be used anywhere in the application
    //         console.log(session.user, user)
    //         if (session.user){
    //             session.user.id = user.id
    //         }


    //         return Promise.resolve(session)
    //     },
    //     async jwt({ token , account, profile}) {
    //         // Persist the OAuth access_token and or the user id to the token right after signin
    //         if (account) {
    //             token.accessToken = account!.access_token
    //             token.id = profile!.name
    //         }

    //         return Promise.resolve(token)
    //     }
    // }
});
