import MainNavigation from "../components/Nav/MainNavigation";
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
          {/* @ts-expect-error Server Component */}
          <MainNavigation />
        </header>
        {children}
      </body>
    </html>
  );
}
