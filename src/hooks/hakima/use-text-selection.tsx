import { useEffect, useState } from "react";

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentDiv = document.getElementById("chat-container");

        if (parentDiv?.contains(range.commonAncestorContainer)) {
          const selectedText = range.toString().trim();
          if (selectedText) {
            setSelectedText(selectedText);
            setShowPopup(true);
          } else {
            setShowPopup(false);
          }
        }
      } else {
        setShowPopup(false);
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("touchend", handleSelection); // Fix for mobile

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);

  const handleClearSelection = () => {
    setShowPopup(false);
    setSelectedText("");
    window.getSelection()?.removeAllRanges();
  };

  return { selectedText, showPopup, handleClearSelection };
};
