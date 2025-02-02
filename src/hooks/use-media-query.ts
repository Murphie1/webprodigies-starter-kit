"use client"

import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", updateMatches);

    // Initial check
    updateMatches();

    // Clean up listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
};
