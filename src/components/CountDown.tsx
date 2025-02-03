import React, { useState, useEffect } from "react";
import Text from "./Text";
import { BonVivantFont } from "@/style/fonts";

const targetDate = new Date("Februari 21, 2025 07:00:00");
const endDate = new Date("Februari 21, 2025 13:00:00");

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountDown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  // const targetDate = new Date('2025-02-21T00:00:00'); // Set target date

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

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  }

  if (!isClient) {
    // Prevent rendering on the server to avoid mismatch
    return null;
  }

  return (
    // <div className="countdown-container flex flex-col items-center bg-gray-100 py-16pxr text-14pxr leading-25pxr rounded-xl">
    <div>
      {/* <Text
      >
        Countdown

      </Text>
      <Text className="text-center">
        {timeLeft.days !== undefined ? (
          <>
            {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{" "}
            Minutes {timeLeft.seconds} Seconds
          </>
        ) : (
          "The event has started!"
        )}
      </Text> */}
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300"
      >
        Remind Me on Google Calendar
      </a>
    </div>
  );
};

export default CountDown;
