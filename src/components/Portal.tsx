import ReactDOM from "react-dom";
import { ReactNode } from "react";

const Portal = ({ children }: { children: ReactNode }) => {
  const element =
    typeof window !== "undefined" && document.querySelector("#portal");
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
