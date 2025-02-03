import React, { useCallback, useEffect, useRef, useState } from "react";
import { BonVivantFont } from "@/style/fonts";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import Text from "../Text";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";
import Image from "next/image";
import Subtitle from "./Subtitle";
import CountDown from "../CountDown";

const TITLE = ["The Groom & Bride"];

const Story = ({ visitedWelcome }: { visitedWelcome: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

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
  }, []);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);

  useInterval(() => {
    if (
      !startTransition ||
      !callTimeout ||
      transitionIds.length >= TITLE.length + 5
    )
      return;
    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);

  useEffect(() => {
    if (!startTransition) return;
    setTimeout(() => {
      setCallTimeout(true);
    }, 1000);
  }, [startTransition]);

  useEffect(() => {
    if (transitionIds.length === 4) {
      setStartTransition(false);
    }
  }, [transitionIds]);

  useIsInView(ref, handleTransition, !visitedWelcome);

  return (
    <section id="reli-section" ref={ref} className="w-full px-24pxr relative">
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

      <div className="flex justify-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full border border-gray-400">
          {/* <div className="absolute inset-0 rounded-full border-2 border-white"></div> */}
          <Text
            className={`text-10pxr medium:text-20pxr large:text-24pxr leading-none ${BonVivantFont.className}`}
          >
            S&N
          </Text>
        </div>
      </div>

      <Spacing size={15} />

      {/* Section 2 */}
      <div className="text-center">
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title key={title} display="block">
              {title}
            </Title>
          </SlideUp>
        ))}
      </div>

      <Spacing size={15} />

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Text
          display="inline-block"
          className={`whitespace-pre-line text-center text-14xpr`}
        >
          {`Assalamu'alaikum Warahmatullaahi Wabarakaatuh. Dengan memohon Rahmat dan Ridho Allah SWT. Kami mengharapkan kehadiran Bapak/Ibu/Saudara/i. pada acara Resepsi Pernikahan putra-putri kami:`}
        </Text>
      </SlideUp>

      <Spacing size={50} />

      {/* section couple */}
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex flex-row items-center gap-4">
          <Spacing size={10} />
          <Image
            src="/profile/photo2.jpg"
            alt="Sultan Atha Naufal"
            width={125}
            height={125}
            className="rounded-full"
          />
          <Spacing size={10} />
          <div className="flex flex-col gap-3">
            <Subtitle display="block">Sultan Atha Naufal, S.Kom.</Subtitle>
            <Text display="inline-block" className={`whitespace-pre-line`}>
              {`Putra Bapak Achyad Sunarya & \n Ibu Tri Pujiyanti`}
            </Text>
          </div>
        </div>
      </SlideUp>
      <Spacing size={25} />
      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <div className="w-full flex flex-row items-center gap-4">
          <Spacing size={10} />
          <div className="flex flex-col gap-3">
            <Subtitle display="block">
              Natasya Intan Permatasari, S.I.Kom.
            </Subtitle>
            <Text display="inline-block" className={`whitespace-pre-line`}>
              {`Putri Bapak Agus Suratno & \n Ibu Ekaeksi Rahayu Ningtyas`}
            </Text>
          </div>
          <Spacing size={10} />
          <Image
            src="/profile/photo1.jpg"
            alt="Natasya Intan Permatasari"
            width={125}
            height={125}
            className="rounded-full"
          />
        </div>
      </SlideUp>
      {/* section couple */}

      <Spacing size={50} />

      <div className="border-b border-gray-200/75"></div>

      <Spacing size={50} />

      {/* Section 2 */}

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Text
          display="inline-block"
          className={`whitespace-pre-line text-center text-10xpr`}
        >
          {`"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."`}
        </Text>
      </SlideUp>

      <Spacing size={15} />

      <div className="text-center pb-24">
        <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
          <Subtitle display="block">QS Ar-Rum 21</Subtitle>
        </SlideUp>
      </div>

      <Spacing size={15} />

      {/* Section 1 */}
    </section>
  );
};

export default Story;
