import React, { CSSProperties, ReactNode, useEffect, useState } from "react";

const FadeIn = ({
  children,
  show = false,
  className = "",
  style
}: {
  children: ReactNode;
  show?: boolean;
  style?: CSSProperties;
  className?: string;
}) => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (show) {
      setInitialized(true);
    }
  }, [show]);

  return (
    <div
      style={style}
      className={`${!initialized ? "invisible" : " fade-in"}
       ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
