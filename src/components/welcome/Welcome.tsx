"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  BonVivantFont,
  Tangerine,
  Monsterrat,
  PlayFair,
  Lora,
  JohnDavidson,
} from "@/style/fonts";
import Flex from "../Flex";
import ScrollArrow from "../../../public/scroll_arrow.svg";
import SlideUp from "../SlideUp";
import Text from "../Text";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["THE WEDDING OF"];
const TITLE_2 = ["Sultan"];
const TITLE_3 = ["&"];
const TITLE_4 = ["Natasya"];
const Welcome = ({
  className,
  onNext,
}: {
  className?: string;
  onNext: () => void;
}) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);

  useInterval(() => {
    if (
      !startTransition ||
      transitionIds.length > TITLE.length ||
      !imageLoaded
    ) {
      return;
    }
    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 100);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!startTransition || !imageLoaded) return;

    const timeout = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 1800);

    const timeout2 = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [startTransition, imageLoaded]);

  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (visible) return;

    const timeoutId = setTimeout(() => {
      setHidden(true);
    }, 1100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible, imageLoaded]);

  useEffect(() => {
    if (hidden) {
      onNext();
    }
  }, [hidden, onNext]);

  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [recipient, setRecipient] = useState<string | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    imageRef.current.complete && setImageLoaded(true);
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get("to");
    if (to) {
      setRecipient(decodeURIComponent(to));
    }
  }, [imageRef]);

  useIsInView(ref, () => setStartTransition(true));

  if (hidden) return null;

  return (
    <div
      ref={ref}
      onClick={() => setVisible(false)}
      style={{ height: "100svh", transition: "opacity 1s" }}
      className={`relative bg-black w-full flex flex-col items-center justify-between overflow-hidden ${className} ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        ref={imageRef}
        className="min-h-screen absolute top-0 left-0"
        alt="wedding"
        src="/welcome/Welcome.jpg"
        width={860}
        height={1864}
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      <div className="flex flex-col items-center mt-16 mb-2 z-10">
        {TITLE.map((text, index) => (
          <div key={index} className="slide-up-animation">
            <h1
              className={`
              text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              text-white text-center
              px-4 md:px-8 lg:px-16
              ${BonVivantFont.className}
            `}
            >
              {text}
            </h1>
          </div>
        ))}
      </div>
      {/* <div className="h-120pxr"></div> */}
      <div className="flex flex-col items-center mb-12 z-10">
        {/* First Name */}
        <div className="slide-up-animation">
          <h2
            className={`
            text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            text-white font-bold text-center
            ${JohnDavidson.className}
          `}
          >
            {TITLE_2[0]}
          </h2>
        </div>

        {/* Ampersand */}
        <div className="slide-up-animation my-4">
          <span
            className={`
            text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            text-white text-center
            ${BonVivantFont.className}
          `}
          >
            {TITLE_3[0]}
          </span>
        </div>

        {/* Second Name */}
        <div className="slide-up-animation">
          <h2
            className={`
            text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            text-white font-bold text-center
            ${JohnDavidson.className}
          `}
          >
            {TITLE_4[0]}
          </h2>
        </div>
      </div>
      <Flex className="mb-55pxr cursor-pointer mx-auto z-10">
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Flex className={`text-white text-15pxr leading-18pxr my-16pxr`}>
            {/* <Text display="block">2024.06.08, SATURDAY 16:00</Text> */}
            <Text display="block" className={`${Lora.className}`}>
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </Text>
            <Text display="block" className="mt-8pxr">
              {recipient && (
                <h3 className={`${Lora.className} font-bold text-xl uppercase`}>
                  {recipient}
                </h3>
              )}
            </Text>
          </Flex>
        </SlideUp>
        <SlideUp
          show={transitionIds.includes(TITLE.length + 1)}
          className=" mb-10pxr cursor-pointer mx-auto z-10"
        >
          <ScrollArrow className="flex-none mx-5pxr" />
          {/* <button
            // type="submit"
            className="px-4 py-1 bg-gray-400 text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span className={`ml-2 ${BonVivantFont.className}`}>
              Buka Undangan
            </span>
          </button> */}
        </SlideUp>
      </Flex>
    </div>
  );
};

export default Welcome;
