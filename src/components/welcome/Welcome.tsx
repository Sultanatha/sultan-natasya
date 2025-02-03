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
      className={`relative bg-black w-full flex flex-col justify-between overflow-hidden ${className} ${
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
      <Flex className={`mt-60pxr z-10 mb-10pxr`}>
        {TITLE.map((text, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Text
              key={index}
              // display="block"
              className={`pt-10pxr text-46pxr leading-42pxr h-42pxr medium:text-50pxr medium:leading-48pxr medium:h-40pxr regular:text-56pxr regular:leading-54pxr regular:h-54pxr large:text-25pxr large:leading-25pxr large:h-25pxr text-white ${BonVivantFont.className}`}
            >
              {text}
            </Text>
          </SlideUp>
        ))}
      </Flex>
      {/* <div className="h-120pxr"></div> */}
      <Flex className={`mb-50pxr z-10`}>
        {TITLE_2.map((text, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Text
              key={index}
              // display="block"
              className={`text-45pxr leading-42pxr h-42pxr medium:text-49pxr medium:leading-48pxr medium:h-40pxr regular:text-55pxr regular:leading-54pxr regular:h-54pxr large:text-50pxr large:leading-120pxr large:h-60pxr text-white font-bold ${JohnDavidson.className}`}
            >
              {text}
            </Text>
          </SlideUp>
        ))}
        {TITLE_3.map((text, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Text
              key={index}
              // display="block"
              className={`pt-10pxr text-43pxr leading-42pxr h-42pxr medium:text-47pxr medium:leading-48pxr medium:h-40pxr regular:text-53pxr regular:leading-54pxr regular:h-54pxr large:text-25pxr large:leading-40pxr large:h-40pxr text-white ${BonVivantFont.className}`}
            >
              {text}
            </Text>
          </SlideUp>
        ))}
        {TITLE_4.map((text, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Text
              key={index}
              // display="block"
              className={`pt-10pxr text-45pxr leading-42pxr h-42pxr medium:text-49pxr medium:leading-48pxr medium:h-40pxr regular:text-55pxr regular:leading-54pxr regular:h-54pxr large:text-50pxr large:leading-120pxr large:h-60pxr text-white ${JohnDavidson.className}`}
            >
              {text}
            </Text>
          </SlideUp>
        ))}
      </Flex>
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
