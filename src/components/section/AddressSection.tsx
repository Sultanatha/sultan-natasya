"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Address from "./Address";
import Image from "next/image";
import Navigations from "./Navigations";
import RollingBanner from "../RollingBanner";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";
import CountDown from "../CountDown";
import { BonVivantFont } from "@/style/fonts";

const TITLE = ["Akad & Resepsi"];
const AddressSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const handleTransition = useCallback(() => {
    setTimeout(() => {
      setTransitionIds((prev) => (prev.length === 0 ? [0, 1, 2, 3] : prev));
    }, 0);

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 3) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 200);
    }, 1000);

    setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1000);

    setTimeout(() => {
      setTransitionIds((prev) =>
        prev.concat([prev.length, prev.length + 1, prev.length + 2])
      );
    }, 1100);
  }, []);

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 6) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  return (
    <>
      <section
        ref={ref}
        id="address-section"
        className="w-full px-24pxr relative pb-10 text-center"
      >
        <div className="absolute inset-0">
          <Image
            quality={100}
            src="/welcome/bg.png"
            layout="fill"
            objectFit="cover"
            alt="background"
            className="-z-10 rounded-[1.25rem]"
            priority
          />
        </div>

        <Spacing size={50} />
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={16} />

        <div className="flex flex-col bg-gray-100 py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl">
          <SlideUp show={transitionIds.includes(TITLE.length)}>
            <Address
              title="Akad Nikah"
              desc={`21 Februari 2025, \n 08.00 WIB - 10.00 WIB`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-200 text-gray-700 mt-4 rounded-md">
              <Text display="block" className="flex-grow">
                Kediaman mempelai putri, Jl. Dondong 2, No.47 A, RT 007 RW 006,
                Kelurahan Karangboyo, Kecamatan Cepu, Kab. Blora, Jawa Tengah
              </Text>
              {/* <Navigations /> */}
            </div>
          </SlideUp>
        </div>

        <Spacing size={16} />

        <div className="flex flex-col bg-gray-100 py-4 px-4 lg:px-6 text-14pxr leading-25pxr rounded-xl">
          <SlideUp show={transitionIds.includes(TITLE.length)}>
            <Address
              title="Resepsi Nikah"
              desc={`21 Februari 2025, \n 13.00 WIB - 17.00 WIB`}
            />
          </SlideUp>
          <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
            <div className="flex flex-row gap-4 w-full p-4 text-14pxr leading-22pxr bg-gray-200 text-gray-700 mt-4 rounded-md">
              <Text display="block" className="flex-grow">
                Kediaman mempelai putri, Jl. Dondong 2, No.47 A, RT 007 RW 006,
                Kelurahan Karangboyo, Kecamatan Cepu, Kab. Blora, Jawa Tengah
              </Text>
              <Navigations />
            </div>
          </SlideUp>
        </div>
        <SlideUp show={transitionIds.includes(TITLE.length + 6)}>
          <Spacing size={10} />
          {/* <CountDown /> */}
          <Spacing size={10} />
          <RollingBanner />
        </SlideUp>
      </section>
    </>
  );
};

export default AddressSection;
