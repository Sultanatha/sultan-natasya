import React, {
  CSSProperties,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useMemo
} from "react";

interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
}

const Flex = forwardRef(
  (
    {
      children,
      as: As = "div",
      direction = "column",
      align = "center",
      justify = "center",
      ...rest
    }: FlexProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const flexStyles = useMemo(
      () => ({
        display: "flex",
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction
      }),
      [align, justify, direction]
    );

    return (
      <As ref={ref} style={flexStyles} {...rest}>
        {children}
      </As>
    );
  }
);

Flex.displayName = "Flex";
export default Flex;
