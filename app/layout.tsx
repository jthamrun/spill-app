import MainNavigation from "../components/MainNavigation";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <header>
          <MainNavigation />
        </header>

        {children}
      </body>
    </html>
  );
}
