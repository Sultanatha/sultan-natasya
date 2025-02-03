import Flex from "./Flex";
import React from "react";
import RightTopArrow from "../../public/arrow_right_top.svg";
import Text from "./Text";

const ShareButton = ({
  text,
  onClick
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <Flex
      as="button"
      onClick={onClick}
      direction="row"
      justify="space-between"
      className="w-180pxr pl-16pxr pr-12pxr py-11.5pxr bg-white text-black"
    >
      <Text className="text-14pxr leading-25pxr font-medium">{text}</Text>
      <RightTopArrow />
    </Flex>
  );
};

export default ShareButton;
