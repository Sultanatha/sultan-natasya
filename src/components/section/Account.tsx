"use client";

import React, { useCallback } from "react";

import Flex from "../Flex";
import Spacing from "../Spacing";
import Text from "../Text";
import copy from "copy-to-clipboard";
import { useToast } from "../toast/ToastProvider";

const Account = ({
  name,
  bankInfo
}: {
  name: string;
  bankInfo: { bankName: string; accountNumber: string };
}) => {
  const { show } = useToast();

  const handleAccountCopy = useCallback(() => {
    copy(bankInfo.accountNumber.split("-").join(""));
    show("Nomor Akun telah Disalin");
  }, [show, bankInfo.accountNumber]);

  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      className="p-16pxr bg-gray-100 rounded-xl mb-1"
    >
      <Flex align="start text-14pxr leading-16.5pxr">
        <Text className="font-bold text-left">{name}</Text>
        <Spacing size={4} direction="horizontal" />
        <Text className="mt-6pxr">{`${bankInfo.bankName} ${bankInfo.accountNumber}`}</Text>
      </Flex>
      <button
        onClick={handleAccountCopy}
        className="ml-20pxr flex-none text-[#474747] text-12pxr leading-25pxr bg-blue-50 px-12pxr font-bold rounded-xl"
      >
        Salin
      </button>
    </Flex>
  );
};

export default Account;
