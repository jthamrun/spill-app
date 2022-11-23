import BasicNavigation from "../components/BasicNavigation";
import MainNavigation from "../components/MainNavigation";
import "../styles/globals.css";

export default function RootLayout({
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

        <main>{children}</main>
      </body>
    </html>
  );
}
