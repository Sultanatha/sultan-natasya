"use client";

import { useEffect } from "react";
import { useToast } from "./toast/ToastProvider";
import Toast from "./toast/Toast";

const InspectorWarning = () => {
  const { show } = useToast();

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      show(
        "Permission Denied: Right-click is disabled contact https://baseec.tech/"
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl+Shift+I
        (event.metaKey && event.altKey && event.key === "I") || // Cmd+Opt+I (Mac)
        event.key === "F12" // F12
      ) {
        event.preventDefault();
        show(
          "Permission Denied: Developer tools access is restricted contact https://baseec.tech/"
        );
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return null;
};

export default InspectorWarning;
