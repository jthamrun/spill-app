"use client";
import React, { Dispatch, SetStateAction } from "react";

type LoadingContextState = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const LoadingContext = React.createContext<LoadingContextState>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export default LoadingContext;
