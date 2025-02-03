"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import ArrowBottom from "../../public/arrow_bottom.svg";
import ArrowTop from "../../public/arrow_top.svg";
import Flex from "./Flex";

const ArcodionContext = createContext({ visible: false, toggle: () => {} });

const useArcodion = () => {
  const context = useContext(ArcodionContext);

  if (!context) {
    throw new Error("useArcodion must be used within a ArcodionProvider");
  }
  return context;
};
const Arcodion = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(true);
  const toggle = useCallback(() => setVisible((prev) => !prev), []);

  return (
    <ArcodionContext.Provider value={{ visible, toggle }}>
      {children}
    </ArcodionContext.Provider>
  );
};

const Header = ({
  children,
  className
}: {
  children: ReactNode;
  className: string;
}) => {
  const { toggle } = useArcodion();

  return (
    <Flex
      direction="row"
      justify="space-between"
      onClick={toggle}
      className={className}
    >
      {children}
    </Flex>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const { visible } = useArcodion();
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const handleHeight = () => {
    if (!ref.current) {
      setMaxHeight(0);
      return;
    }

    setMaxHeight(visible ? 1000 : 0);
  };

  useEffect(() => {
    requestAnimationFrame(handleHeight);
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`${
        visible ? "arcodion-content" : "arcodion-content-close"
      } overflow-hidden`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};

const Arrow = () => {
  const { visible } = useArcodion();

  return visible ? (
    <ArrowTop className="flex-none" />
  ) : (
    <ArrowBottom className="flex-none" />
  );
};

Arcodion.Header = Header;
Arcodion.Content = Content;
Arcodion.Arrow = Arrow;

Arcodion.displayName = "Arcodion";

export default Arcodion;