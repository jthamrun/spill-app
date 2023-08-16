import { Suspense } from "react";
import MainNavigation from "../components/Nav/MainNavigation";
import LoadingProvider from "../components/store/loading-context/loadingProvider";
import "../styles/globals.css";
import LoadingComponent from "../components/utils/LoadingComponent";

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
        <LoadingProvider>
          <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
        </LoadingProvider>
      </body>
    </html>
  );
}
