import React from "react";

interface SpacingProps {
  size: number;
  direction?: "horizontal" | "vertical";
}
const Spacing = ({ size, direction = "vertical" }: SpacingProps) => {
  return (
    <div
      style={
        direction === "vertical"
          ? {
              height: size + "px"
            }
          : {
              width: size + "px"
            }
      }
    />
  );
};

export default Spacing;
