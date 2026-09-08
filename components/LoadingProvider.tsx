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
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  isMounted: false,
  finishLoading: () => {},
  resetLoading: () => {},
});

const SESSION_KEY = "andra_intro_seen";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      hasSeen = false;
    }

    if (!hasSeen) {
      setIsLoading(true);
      lockScroll();
    } else {
      setIsLoading(false);
    }

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  const finishLoading = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setIsLoading(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    unlockScroll();
  }, [unlockScroll]);

  const resetLoading = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
    setIsLoading(true);
    lockScroll();
  }, [lockScroll]);

  return (
    <LoadingContext.Provider
      value={{ isLoading, isMounted, finishLoading, resetLoading }}
    >
      {isMounted && (
        <AppleHelloLoader
          isLoading={isLoading}
          onFinish={finishLoading}
          onExitComplete={handleExitComplete}
        />
      )}
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
