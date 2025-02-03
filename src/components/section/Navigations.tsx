"use client";

import React, { MouseEventHandler, ReactNode, useCallback } from "react";

import Flex from "../Flex";
// import Kakao from "../../../public/kakaoNavi.svg";
import Link from "next/link";
// import NaverMap from "../../../public/naverMap.svg";
// import TMap from "../../../public/tMap.svg";
// import GMap from "../../../public/new.svg";
import Image from "next/image";

const Navigations = () => {
  // const handleKakaoNavi: MouseEventHandler = useCallback((e) => {
  //   e.preventDefault();
  //   window.Kakao.Navi.start({
  //     name: "삼청각 일화당",
  //     x: 126.98412996463918,
  //     y: 37.59687320253386,
  //     coordType: "wgs84"
  //   });
  // }, []);

  return (
    <Flex
      id="navigations"
      direction="row"
      justify="flex-start"
      align="center"
      className="gap-x-8pxr"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <Kakao onClick={handleKakaoNavi} className="flex-none" /> */}

      <Link href="https://maps.app.goo.gl/TwHLvccnyDcZCQz37">
        <Image
          src="/new.svg" // Replace with your company logo path
          alt="Map"
          width={90} // Set your desired width
          height={90} // Set your desired height
          className="flex-none rounded-full border border-gray-300"
        />
        {/* <GMap className="flex-none" /> */}
      </Link>
    </Flex>
  );
};

export default Navigations;
