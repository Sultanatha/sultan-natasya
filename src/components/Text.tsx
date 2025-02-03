import React, {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode
} from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  display?: CSSProperties["display"];
}
const Text = ({
  display = "inline",
  children,
  as: As = "p",
  style,
  ...rest
}: TextProps) => {
  return (
    <As {...rest} style={{ display, ...style }}>
      {children}
    </As>
  );
};

export default Text;
