"use client";
import { useState } from "react";
import LoadingContext from "./loading-context";
import LoadingComponent from "../../utils/LoadingComponent";

type Props = {
  children?: React.ReactNode;
};

const LoadingProvider = ({ children }: Props): React.ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = {
    isLoading,
    showLoader: () => setIsLoading(true),
    hideLoader: () => setIsLoading(false),
  };
  return (
    <LoadingContext.Provider value={value}>
      {/* can you make it so that this circular bar is in front of every UI and the background is slightly blurred */}
      {isLoading && <LoadingComponent />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
