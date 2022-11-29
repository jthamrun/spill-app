import { unstable_getServerSession } from "next-auth";
import MainNavigation from "../components/MainNavigation";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <MainNavigation />
        </header>

        {children}
      </body>
    </html>
  );
}
