"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import AppleHelloLoader from "@/components/AppleHelloLoader";

interface LoadingContextValue {
  isLoading: boolean;
  isMounted: boolean;
  finishLoading: () => void;
  resetLoading: () => void;
  replayLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: true,
  isMounted: false,
  finishLoading: () => {},
  resetLoading: () => {},
  replayLoading: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollLockedRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (typeof document !== "undefined" && !scrollLockedRef.current) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      scrollLockedRef.current = true;
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      scrollLockedRef.current = false;
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (isLoading) {
      lockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isLoading, lockScroll, unlockScroll]);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    unlockScroll();
  }, [unlockScroll]);

  const resetLoading = useCallback(() => {
    setIsLoading(true);
    lockScroll();
  }, [lockScroll]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isMounted: true,
        finishLoading,
        resetLoading,
        replayLoading: resetLoading,
      }}
    >
      <AppleHelloLoader
        isLoading={isLoading}
        onFinish={finishLoading}
        onExitComplete={handleExitComplete}
      />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingScreen() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingScreen must be used within a LoadingProvider");
  }
  return context;
}
