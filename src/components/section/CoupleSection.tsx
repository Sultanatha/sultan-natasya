"use client";

import React, { useEffect, useRef, useState } from "react";

import CoupleImage from "./CoupleImage";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import Text, { TextProps } from "../Text";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

// const TITLE = ["THE", "MARRIAGE", "OF"];
const TITLE = ["S & G"];
const CoupleSection = () => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const [startTransition, setStartTransition] = useState(false);

  useInterval(() => {
    if (!startTransition) return;

    if (transitionIds.length < TITLE.length) {
      setTransitionIds((prev) => {
        if (prev.length === TITLE.length) {
          return prev;
        }
        return prev.concat(prev.length);
      });
    }
  }, 200);
  useEffect(() => {
    if (!startTransition) return;

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 2) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 500);
    }, 500);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length >= TITLE.length + 2) {
      clearInterval(intervalId.current!);
    }
  }, [transitionIds]);

  const ref = useRef<HTMLDivElement>(null);

  useIsInView(ref, () => setStartTransition(true));

  return (
    <section ref={ref} id="couple-section" className="w-full px-24pxr">
      {TITLE.map((title, index) => (
        <SlideUp key={index} show={transitionIds.includes(index)}>
          <Title display="block">{title}</Title>
        </SlideUp>
      ))}

      <Spacing size={15} />

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Text
          display="inline-block"
          className={`whitespace-pre-line text-justify`}
        >
          {`Assalamu'alaikum Warahmatullaahi Wabarakaatuh. Dengan memohon Rahmat dan Ridho Allah SWT. Kami mengharapkan kehadiran Bapak/Ibu/Saudara/i. pada acara Resepsi Pernikahan putra-putri kami:`}
        </Text>
      </SlideUp>

      <Spacing size={20} />
      <SlideUp show={transitionIds.includes(TITLE.length)}>
        <CoupleImage
          url="/profile/object-1.jpg"
          person={{
            name: "Sultan Atha Naufal, S.Hut.",
            desc: "Putra Bapak Fadholi & Ibu Kun Mariana",
          }}
        />

        <Spacing size={6} />
      </SlideUp>
      <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
        <CoupleImage
          url="/profile/object-2.jpg"
          person={{
            name: "Natasya Intan Permatasari, S.I.Kom.",
            desc: "Putri Bapak (Alm.) Moh. Kholid Hidayatullah & Ibu Tutiek Soelistyani",
          }}
        />
      </SlideUp>
    </section>
  );
};

export default CoupleSection;
