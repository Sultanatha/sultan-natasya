import { ReactNode, useEffect, useState } from "react";

import Portal from "../Portal";
import { useToast } from "./ToastProvider";

type ToastFadeType = "fade-in" | "fade-out";

interface ToastWrapperProps extends ToastProps {
  fadeType: ToastFadeType;
  fixed?: boolean;
}
export const ToastWrapper = ({
  fadeType,
  children,
  fixed = true
}: ToastWrapperProps) => {
  return (
    <div
      className={`${fadeType} ${
        fixed ? "fixed" : ""
      } w-full px-24pxr top-24pxr`}
    >
      <div
        aria-label="toast notification"
        className={` text-white w-full flex items-center justify-start pointer-events-none text-left text-14pxr leading-20pxr p-16pxr`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export interface ToastProps {
  children: ReactNode;
}

const Toast = ({ children }: ToastProps) => {
  const { onClose } = useToast();
  const [fadeType, setFadeType] = useState<"fade-in" | "fade-out">("fade-in");

  useEffect(() => {
    if (!children) return;

    const timeoutID = setTimeout(() => {
      setFadeType("fade-out");
    }, 1500);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [children]);

  useEffect(() => {
    if (fadeType === "fade-in") return;
    const timeoutId = setTimeout(() => {
      setFadeType("fade-in");
      onClose();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fadeType]);

  if (!children) return null;

  return (
    <Portal>
      <ToastWrapper fadeType={fadeType}>{children}</ToastWrapper>
    </Portal>
  );
};

export default Toast;
