import React, { CSSProperties, ReactNode, useEffect, useState } from "react";

const SlideUp = ({
  id,
  children,
  show = false,
  className = "",
  disabled = false,
  style
}: {
  id?: string;
  show?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (show) {
      setInitialized(true);
    }
  }, [show]);

  if (disabled) return <>{children}</>;

  return (
    <div
      id={id}
      className={`will-change-transform slideup-container ${className}`}
      style={style}
    >
      <div
        className={`${!initialized ? "invisible" : ""} ${show ? "active" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideUp;
