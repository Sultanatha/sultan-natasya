"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "@/hooks/useInterval";
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
import {
  BonVivantFont,
  Tangerine,
  Monsterrat,
  PlayFair,
  Lora,
} from "@/style/fonts";

const TITLE = ["Countdown"];
const TITLE_2 = ["We're getting married"];

const targetDate = new Date("2025-02-21T08:00:00"); // Start time
const endDate = new Date("2025-02-21T17:00:00"); // End time

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const AddressSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);
  const [startTransition, setStartTransition] = useState(false);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;
    setTransitionIds((prev) => [...prev, prev.length]);
  }, 200);

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

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 6) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function getGoogleCalendarUrl() {
    const start = targetDate.toISOString().replace(/-|:|\.\d+/g, "");
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, "");
    const title = encodeURIComponent("Sultan & Natasya Wedding");
    const details = encodeURIComponent(
      "Event Details: Sultan & Natasya Wedding"
    );
    const location = encodeURIComponent("Event Location: Cepu");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  }

  return (
    <>
      <div
        ref={ref}
        id="address-section"
        className="w-full px-24pxr relative pb-10 text-center"
      >
        <div className="absolute inset-0 opacity-40">
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
        </div>

        <Spacing size={50} />

        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <text
              className={`pt-10pxr text-45pxr leading-42pxr h-42pxr medium:text-49pxr medium:leading-48pxr medium:h-40pxr regular:text-55pxr regular:leading-54pxr regular:h-54pxr large:text-45pxr large:leading-45pxr large:h-45pxr text-Black ${BonVivantFont.className}`}
            >
              {title}
            </text>
          </SlideUp>
        ))}

        <Spacing size={15} />
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <div className="text-center">
            <Text className="text-center">
              {timeLeft.days !== undefined ? (
                <div className="countdown-display flex justify-center gap-5">
                  <div className="countdown-item flex flex-col items-center border-2 border-black p-3 rounded-lg bg-white">
                    <span
                      className={`countdown-number text-3xl font-bold ${BonVivantFont.className}`}
                    >
                      {timeLeft.days}
                    </span>
                    <span
                      className={`countdown-label uppercase text-sm font-bold ${BonVivantFont.className}`}
                    >
                      Days
                    </span>
                  </div>
                  <div className="countdown-item flex flex-col items-center border-2 border-black p-3 rounded-lg bg-white">
                    <span
                      className={`countdown-number text-3xl font-bold ${BonVivantFont.className}`}
                    >
                      {timeLeft.hours}
                    </span>
                    <span
                      className={`countdown-label uppercase text-sm font-bold  ${BonVivantFont.className}`}
                    >
                      Hours
                    </span>
                  </div>
                  <div className="countdown-item flex flex-col items-center border-2 border-black p-3 rounded-lg bg-white">
                    <span
                      className={`countdown-number text-3xl font-bold ${BonVivantFont.className}`}
                    >
                      {timeLeft.minutes}
                    </span>
                    <span
                      className={`countdown-label uppercase text-sm font-bold  ${BonVivantFont.className}`}
                    >
                      Minutes
                    </span>
                  </div>
                  <div className="countdown-item flex flex-col items-center border-2 border-black p-3 rounded-lg bg-white">
                    <span
                      className={`countdown-number text-3xl font-bold ${BonVivantFont.className}`}
                    >
                      {timeLeft.seconds}
                    </span>
                    <span
                      className={`countdown-label uppercase text-sm font-bold  ${BonVivantFont.className}`}
                    >
                      Seconds
                    </span>
                  </div>
                </div>
              ) : (
                "The event has started!"
              )}
            </Text>
          </div>
        </SlideUp>

        <Spacing size={15} />

        {TITLE_2.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <text
              className={`pt-10pxr text-45pxr leading-42pxr h-42pxr medium:text-49pxr medium:leading-48pxr medium:h-40pxr regular:text-55pxr regular:leading-54pxr regular:h-54pxr large:text-25pxr large:leading-30pxr large:h-25pxr text-Black ${BonVivantFont.className}`}
            >
              {title}
            </text>
          </SlideUp>
        ))}

        <Spacing size={15} />

        <SlideUp show={transitionIds.includes(TITLE.length + 6)}>
          <Spacing size={10} />
          <CountDown />
          <Spacing size={10} />
          {/* <RollingBanner /> */}
        </SlideUp>
      </div>
    </>
  );
};

export default AddressSection;
