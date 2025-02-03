import React, { ReactNode } from "react";

import SlideUp from "./SlideUp";
import Text from "./Text";

const Calendar = ({ children }: { children: ReactNode }) => {
  return <div className="w-full grid grid-cols-7 gap-y-12pxr">{children}</div>;
};

Calendar.Days = () => {
  return ["M", "S", "S", "R", "K", "J", "S"].map((day, i) => (
    <Text
      key={day}
      display="block"
      className={`font-bold first-letter:w-full py-7.5pxr text-center flex items-center justify-center ${
        i === 0 ? "text-[#00AEFF]" : "text-black"
      }`}
    >
      {day}
    </Text>
  ));
};

Calendar.Dates = ({
  startDate,
  endDate,
  activeDate
}: {
  startDate: number;
  endDate: number;
  activeDate: number;
}) => {
  return Array.from({ length: endDate - startDate - 1 }).map((_, i) => {
    const isActive = i + startDate === activeDate;
    return (
      <div
        key={i}
        className={`w-full text-center flex justify-center items-center `}
      >
        <Text
          display="block"
          className={`w-40pxr py-7.5pxr items-center flex justify-center ${
            isActive
              ? "bg-black font-bold text-[#00AEFF]"
              : i % 7 === 0
              ? "text-[#00AEFF]"
              : ""
          }
          `}
        >
          {startDate + i}
        </Text>
      </div>
    );
  });
};
export default Calendar;
