"use client";

import React, { useCallback } from "react";

import ShareButton from "../ShareButton";
import Spacing from "../Spacing";
import copy from "copy-to-clipboard";
import { useToast } from "../toast/ToastProvider";

const FooterButtons = () => {
  const { show } = useToast();

  const handleCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;
    copy(window.location.href);
    show("URL 링크가 복사되었습니다.");
  }, []);

  // const handleKakaoShare = useCallback(() => {
  //   if (confirm("다른 앱으로 이 페이지를 열겠습니까?")) {
  //     // 카카오톡 공유 로직
  //     if (typeof window === "undefined") return;
  //     window.Kakao.Share.sendScrap({
  //       requestUrl: window.location.href
  //     });
  //   }
  // }, []);

  return (
    <>
      {/* <ShareButton text="카카오톡 공유하기" onClick={handleKakaoShare} /> */}
      <Spacing size={6} />
      <ShareButton text="링크 복사하기" onClick={handleCopyLink} />
    </>
  );
};

export default FooterButtons;
