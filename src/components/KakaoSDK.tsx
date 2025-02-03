"use client";

import React, { ReactNode, useEffect } from "react";

const KakaoSDK = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.getElementById("kakao-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.async = true;
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js";
    script.integrity =
      "sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01";
    script.crossOrigin = "anonymous";

    script.onload = () => {
      window.Kakao.init("7abc44b737ca7c70cf509f0c9d3c98ed");
      console.log("Kakao SDK loaded");
    };
    document.body.appendChild(script);
  }, []);

  return <>{children}</>;
};

export default KakaoSDK;
