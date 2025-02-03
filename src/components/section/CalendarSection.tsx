"use client";

import React, { useEffect, useRef, useState } from "react";

import Calendar from "../Calendar";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Title from "./Title";
import { useInterval } from "@/hooks/useInterval";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["14.09.2024", "SABTU", "7:00 WIB - SELESAI"];
const CalendarSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const [startTransition, setStartTransition] = useState(false);
  const [callTimeout, setCallTimeout] = useState(false);

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

  useIsInView(ref, () => setStartTransition(true));

  return (
    <section id="calendar-section" ref={ref} className="w-full px-24pxr">
      {TITLE.map((title, index) => (
        <SlideUp key={index} show={transitionIds.includes(index)}>
          <Title key={title} display="block">
            {title}
          </Title>
        </SlideUp>
      ))}

      <Spacing size={15} />

      <SlideUp show={transitionIds.includes(TITLE.length)} className="w-full">
        <Calendar>
          <Calendar.Days />

          <Calendar.Dates startDate={1} endDate={32} activeDate={14} />
        </Calendar>
      </SlideUp>
    </section>
  );
};

export default CalendarSection;
