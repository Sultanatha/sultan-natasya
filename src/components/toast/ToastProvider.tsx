"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState
} from "react";
import Toast, { ToastProps } from "./Toast";

interface ToastContextValue {
  show: (message: string) => void;
  onClose: () => void;
}

const ToastContext = createContext<ToastContextValue>({
  show: () => {},
  onClose: () => {}
});

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastProps, setToastProps] = useState<ToastProps>();

  const value = useMemo(
    () => ({
      show: (message: string) => {
        setToastProps({ children: message });
      },
      onClose: () => {
        setToastProps(undefined);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastProps && <Toast {...toastProps} />}
    </ToastContext.Provider>
  );
};
