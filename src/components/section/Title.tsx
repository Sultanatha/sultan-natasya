import React, { CSSProperties, ReactNode } from "react";

import { BonVivantFont } from "@/style/fonts";
import Text from "../Text";

const Title = ({
  children,
  display = "inline"
}: {
  children: ReactNode;
  display?: CSSProperties["display"];
}) => {
  return (
    <Text
      style={{ display }}
      className={`${BonVivantFont.className} text-24pxr leading-45pxr medium:text-34pxr medium:leading-37pxr large:text-40pxr large:leading-44pxr whitespace-pre-line`}
    >
      {children}
    </Text>
  );
};

export default Title;
