// enforces rule that requires user to be authenticated to access the pages on the "matcher" key
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { db } from "./firebase.config";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    if (
      req.nextUrl.pathname.includes("/search/people") &&
      req.nextUrl.pathname != "/search/people"
    ) {
      // check if the person uid is valid, if not, redirect back to /search/people
      const snapshot = await getDocs(
        query(
          collection(db, "users"),
          where("__name__", "==", req.nextUrl.pathname.split("/").pop())
        )
      );

      return snapshot.empty
        ? NextResponse.redirect(new URL("/search/people", req.url))
        : NextResponse.next();
    } else if (
      req.nextUrl.pathname.includes("/search/friends") &&
      req.nextUrl.pathname != "/search/friends"
    ) {
      // check if the friend uid is valid, if not, redirect back to /search/friends
      const snapshot = await getDocs(
        query(
          collection(db, "friends"),
          where("__name__", "==", req.nextUrl.pathname.split("/").pop())
        )
      );

      return snapshot.empty
        ? NextResponse.redirect(new URL("/search/friends", req.url))
        : NextResponse.next();
    } else if(req.nextUrl) {
      // check if user is authorized to access an edit expense card that has the user invited into it
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/expense/:path*",
    "/search/friends/:path*",
    "/search/people/:path*",
  ],
};
