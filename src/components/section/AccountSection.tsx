"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Account from "./Account";
import Arcodion from "../Arcodion";
import FooterSection from "./FooterSection";
import CoupleStory from "../section/CoupleStory";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import Whises from "./Whises";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["Gift For", "Wedding Ceremony"];

const AccountSection = ({ onDone }: { onDone: () => void }) => {
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useInterval(() => {
    if (!startTransition || transitionIds.length >= TITLE.length) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 200);
  useIsInView(ref, () => setStartTransition(true));

  const [callTimeout, setCallTimeout] = useState(false);

  useInterval(() => {
    if (!callTimeout || transitionIds.length >= TITLE.length + 2) return;

    setTransitionIds((prev) => {
      return prev.concat(prev.length);
    });
  }, 100);

  useEffect(() => {
    if (!startTransition) return;

    setTimeout(() => {
      setCallTimeout(true);
    }, 1400);

    const intervalId = setInterval(() => {
      setTransitionIds((prev) => {
        if (prev.length === TITLE.length + 2) {
          clearInterval(intervalId);
          return prev;
        }
        return prev.concat(prev.length);
      });
    }, 100);

    const timeoutId = setTimeout(() => {
      setTransitionIds((prev) => prev.concat(TITLE.length + 2));
      clearTimeout(timeoutId);
    }, 1000);
    onDone();
  }, [startTransition]);

  return (
    <>
      <section
        ref={ref}
        id="account-section"
        className="w-full bg-gradient-to-b from-white to-[#e5e7eb] px-24pxr pb-8 -z-10 rounded-[1.25rem]"
      >
        <div className="text-center">
          {TITLE.map((title, i) => (
            <SlideUp key={title} show={transitionIds.includes(i)}>
              <Title>{title}</Title>
            </SlideUp>
          ))}
        </div>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>Nomor Rekening mempelai Pria</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              <Account
                name="Sultan Atha Naufal"
                bankInfo={{
                  bankName: "BCA",
                  accountNumber: "2460963811",
                }}
              />
              {/* <Spacing size={1} />
              <Account
                name="Sultan Atha Naufal"
                bankInfo={{
                  bankName: "BNI",
                  accountNumber: "1650853360",
                }}
              /> */}
              <Spacing size={1} />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <Arcodion>
            <Arcodion.Header className="cursor-pointer w-full py-21.5pxr border-t border-black">
              <Text>Nomor Rekening mempelai Wanita</Text>
              <Arcodion.Arrow />
            </Arcodion.Header>
            <Arcodion.Content>
              <Account
                name="Natasya Intan Permatasari"
                bankInfo={{
                  bankName: "BCA",
                  accountNumber: "2460723259",
                }}
              />
              <Spacing size={1} />
              <Account
                name="Natasya Intan Permatasari"
                bankInfo={{
                  bankName: "CIMB NIAGA",
                  accountNumber: "707377543600",
                }}
              />
              <Spacing size={1} />
            </Arcodion.Content>
          </Arcodion>
        </SlideUp>
      </section>
      <Spacing size={50} />
      <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
        {/* <IntroduceSection visitedWelcome /> */}
        <CoupleStory />
        <Spacing size={50} />
        <Whises />
      </SlideUp>
    </>
  );
};

export default AccountSection;
