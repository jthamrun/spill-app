import { Suspense } from "react";
import MainNavigation from "../components/Nav/MainNavigation";
import LoadingProvider from "../components/store/loading-context/loadingProvider";
import "../styles/globals.css";
import LoadingComponent from "../components/utils/LoadingComponent";
import { Provider } from "react-redux";
import { store } from "../components/store/store";
import { ReduxProvider } from "../components/store/reduxProvider";

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
        <ReduxProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
