import React, { CSSProperties } from "react";

import Flex from "../Flex";

const ProgressBar = ({ width }: { width: CSSProperties["width"] }) => {
  return (
    <Flex direction="row" align="center" className="h-3pxr w-full">
      <div style={{ width }} className="bg-black h-full" />
      <div className="grow bg-[#F4F4F4] h-full" />
    </Flex>
  );
};

export default ProgressBar;
