"use client";
import { useState } from "react";
import LoadingContext from "./loading-context";
import CircularProgress from "@mui/material/CircularProgress";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";

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
      {isLoading && (
        <div className="font-quicksand font-semibold fixed top-0 left-0 w-screen h-screen bg-white flex flex-col justify-center items-center z-50">
          <div className="relative">
            <CircularProgress size={60} sx={{color: "green"}} />
            <RocketLaunchIcon className="absolute w-7 h-7 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-base-green"/>
          </div>
          <p className="mt-3">Hang on tight!</p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
