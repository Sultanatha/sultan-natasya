import React, { CSSProperties, ReactNode } from "react";

import { BonVivantFont } from "@/style/fonts";
import Text from "../Text";

const Subtitle = ({
  children,
  display = "inline"
}: {
  children: ReactNode;
  display?: CSSProperties["display"];
}) => {
  return (
    <Text
      style={{ display }}
      className={`${BonVivantFont.className} text-14pxr font-bold leading-20pxr medium:text-24pxr medium:leading-27pxr large:text-30pxr large:leading-34pxr whitespace-pre-line`}
    >
      {children}
    </Text>
  );
};

export default Subtitle;
