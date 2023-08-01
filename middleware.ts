// enforces rule that requires user to be authenticated to access the pages on the "matcher" key
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/expense/:path*", "/search/friends/:path*"],
};
