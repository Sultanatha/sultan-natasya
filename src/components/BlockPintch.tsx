"use client";

import React, { ReactNode, useEffect } from "react";

const BlockPintch = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handler = (e: unknown) => {
      // @ts-ignore
      if (e.scale !== 1) {
        // @ts-ignore
        e.preventDefault();
      }
    };
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      document.addEventListener("touchmove", handler, { passive: false });
    }
    return () => {
      document.removeEventListener("touchmove", handler);
    };
  }, []);
  return <>{children}</>;
};

export default BlockPintch;
