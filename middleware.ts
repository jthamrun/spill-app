// enforces rule that requires user to be authenticated to access the pages on the "matcher" key
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { db } from "./firebase.config";
import { NextResponse } from "next/server";
import { useParams, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const params = useParams()!;
    const queryParams = useSearchParams()!;
    const session: any = getServerSession(authOptions);

    if (
      req.nextUrl.pathname.includes("/search/people") &&
      req.nextUrl.pathname != "/search/people"
    ) {
      // check if the person uid is valid, if not, redirect back to /search/people
      const snapshot = await getDocs(
        query(
          collection(db, "users"),
          where("__name__", "==", params.uid as string)
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
          where("__name__", "==", params.uid as string)
        )
      );

      return snapshot.empty
        ? NextResponse.redirect(new URL("/search/friends", req.url))
        : NextResponse.next();
    } else if (req.nextUrl.pathname.includes("/expense/edit")) {
      // check if user is authorized to access an edit expense card that has the user invited into it

      // first check if the link has a valid inviteID
      if (queryParams.get("inviteId")) {
        const snapshot = await getDocs(
          query(
            collection(db, "expenses"),
            where("inviteId", "==", queryParams.get("inviteId"))
          )
        );

        // return snapshot.empty
        //   ? NextResponse.redirect(new URL("/", req.url))
        //   : NextResponse.next();
        if (!snapshot.empty) {
          return NextResponse.next();
        }
      } else {
        // this means that the url is not an invite link, check if the user accessing this is allowed or not
        const snapshot = await getDocs(
          query(
            collection(db, "expenses"),
            where("__name__", "==", params.editId as string)
          )
        )
        if(!snapshot.empty) {
          // if expense exists then check if user is part of this expense
          const doc = snapshot.docs[0]
          if(doc.data().users.includes(session.user.id)){
            return NextResponse.next()
          }
        }
      }
      // if all of them invalid then redirect user to dashboard 
      return NextResponse.redirect(new URL("/", req.url));
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