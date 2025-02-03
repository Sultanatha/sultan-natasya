"use client";

import { useEffect } from "react";
import { useToast } from "./toast/ToastProvider";

const ScreenshotWarning = () => {
  const { show } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "PrintScreen") || // Windows: Print Screen key
        (event.key === "F13") ||         // Windows: F13 can be mapped to PrtScn
        (event.ctrlKey && event.key === "PrintScreen") || // Windows: Alt+PrtScn
        (event.metaKey && event.shiftKey && event.key === "3") || // macOS: Cmd+Shift+3
        (event.metaKey && event.shiftKey && event.key === "4") // macOS: Cmd+Shift+4
      ) {
        event.preventDefault();
        show("Screenshots are disabled.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return null;
};

export default ScreenshotWarning;
