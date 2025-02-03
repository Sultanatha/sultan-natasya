"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Text, { TextProps } from "../Text";
import { BonVivantFont } from "@/style/fonts";
import Flex from "../Flex";
import Image from "next/image";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import useIsInView from "@/hooks/useIsInView";
import Glare from "../../../public/glare/glare.svg";

const Title = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={`h-48pxr medium:h-61pxr large:h-67pxr pt-8pxr ${className}`}
      {...props}
    />
  );
};

const IntroduceSection = ({ visitedWelcome }: { visitedWelcome: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const intervalId2 = useRef<NodeJS.Timeout | null>(null);
  const intervalId3 = useRef<NodeJS.Timeout | null>(null);

  const handleTransition = useCallback(() => {
    intervalId.current = setInterval(() => {
      setTransitionIds((prev) => {
        if (prev.length === 6) {
          clearInterval(intervalId.current!);
          return prev;
        }
        return prev.concat(prev.length);
      });
    }, 200);

    const timeoutID = setTimeout(() => {
      intervalId2.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === 8) {
            clearInterval(intervalId2.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 400);
    }, 1000);

    const timeoutID2 = setTimeout(() => {
      intervalId3.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === 11) {
            clearInterval(intervalId3.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 900);
    }, 1800);
  }, []);

  useEffect(() => {
    if (transitionIds.length === 12) {
      clearInterval(intervalId.current!);
      clearInterval(intervalId2.current!);
      clearInterval(intervalId3.current!);
    }
  }, [transitionIds]);

  useIsInView(ref, handleTransition, !visitedWelcome);

  return (
    <section ref={ref} id="introduce" className="w-full h-screen relative">
      <div className="absolute inset-0">
        <Image
          quality={100}
          src="/hero/hero-2.jpg"
          layout="fill"
          objectFit="cover"
          alt="background"
          className="-z-10"
        />
      </div>

      {/* <div
        className={`${BonVivantFont.className} text-66pxr leading-58pxr medium:text-81pxr medium:leading-71pxr large:text-88pxr large:leading-77pxr w-full gap-4`}
      >
        <SlideUp
          show={transitionIds.includes(0)}
          style={{ transform: "translate(-0.75rem)" }}
        >
          <Title display="block">NEVER</Title>
        </SlideUp>
        <Spacing size={8} />
        <Flex direction="row" align="center" justify="end">
          <SlideUp
            show={transitionIds.includes(6)}
            className="flex-none w-44pxr h-44pxr medium:w-48pxr medium:h-48pxr large:w-52pxr large:h-52pxr"
          >
            <Glare />
          </SlideUp>
          <SlideUp
            show={transitionIds.includes(1)}
            style={{ transform: "translate(0.75rem)" }}
          >
            <Title display="block" className="text-right">
              WITH
            </Title>
          </SlideUp>
        </Flex>
        <Spacing size={8} />
        <SlideUp
          show={transitionIds.includes(2)}
          style={{ transform: "translate(-0.75rem)" }}
        >
          <Title display="block">SADNESS</Title>
        </SlideUp>
        <Spacing size={8} />
        <SlideUp
          show={transitionIds.includes(3)}
          className="w-full"
          style={{ transform: "translate(0.75rem)" }}
        >
          <Title display="block" className="text-right">
            ALWAYS
          </Title>
        </SlideUp>
        <Spacing size={8} />
        <Flex direction="row" align="center" justify="start">
          <SlideUp show={transitionIds.includes(4)}>
            <Title display="block" style={{ transform: "translate(-0.75rem)" }}>
              WITH
            </Title>
          </SlideUp>
          <SlideUp
            show={transitionIds.includes(7)}
            className="flex-none w-44pxr h-44pxr medium:w-48pxr medium:h-48pxr large:w-52pxr large:h-52pxr"
          >
            <Glare />
          </SlideUp>
        </Flex>
        <Spacing size={8} />
        <SlideUp show={transitionIds.includes(5)}>
          <Flex direction="row" align="start" justify="end">
            <Title style={{ transform: "translate(0.55rem)" }}>GLADNESS</Title>
          </Flex>
        </SlideUp>
      </div> */}
      <Spacing size={18} />
      <Flex align="start" className="gap-20pxr px-24pxr mt-10pxr">
        {[
          `Awal bertemu : Kami berdua pertama kali bertemu saat kelas 1 SMA pada tahun 2013, dimana saat itu kami merupakan teman satu kelas dan organisasi`,
          `Acara Lamaran : Kami berdua memutuskan menjalin hubungan pada tahun 2019. Lalu setelah saling mengenal dan memahami satu sama lain, akhirnya pada Oktober 2023 kami memutuskan untuk melanjutkan ke tahap serius, yaitu tahap lamaran`,
          `Acara Resepsi : Setelah melalui beberapa proses, akhirnya turut mengundang Bapak/Ibu/Saudara/Teman-Teman untuk bisa menghadiri acara resepsi pernikahan kami.`,
        ].map((text, i) => (
          <SlideUp key={i} show={transitionIds.includes(8 + i)}>
            <Text
              key={text}
              display="block"
              className="whitespace-pre-line text-16pxr leading-26pxr"
            >
              {text}
            </Text>
          </SlideUp>
        ))}
      </Flex>
    </section>
  );
};

export default IntroduceSection;
