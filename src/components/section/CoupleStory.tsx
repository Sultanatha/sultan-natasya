import React, { useState, useEffect, useRef } from "react";
import { BonVivantFont, Lora, Tangerine } from "@/style/fonts";

interface TimelineItemData {
  id: number;
  title: string;
  date: string;
  image: string;
  description: string;
}
interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isVisible: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  isVisible,
}) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex justify-center items-center mb-16 opacity-0 transform translate-y-8 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : ""
      } ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Timeline circle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300" />

      {/* Content */}
      <div className="w-6/14">
        <div
          className={`p-1 bg-white rounded-lg shadow-md ${
            index % 2 === 0 ? "mr-8" : "ml-8"
          }`}
        >
          <p className="text-14pxr text-gray-500 text-sm">{item.date}</p>
          <p className="text-16pxr font-serif font-semibold mb-2">
            {item.title}
          </p>
          <p className="text-12pxr text-gray-700">{item.description}</p>
        </div>
      </div>

      {/* Image */}
      <div className="w-1/8">
        <div
          className={`relative w-40 h-40 rounded-full overflow-hidden mx-auto ${
            index % 2 === 0 ? "ml-8" : "mr-8"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-50 h-50 object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineData = [
    {
      id: 1,
      title: "Awal Bertemu",
      date: "2017",
      image: "/hero/photo3.jpg",
      description:
        "Pertama kali bertemu saat ospek penerimaan mahasiswa baru di Udinus Semarang. Saat itu Natasya sebagai panitia ospek dan Sultan sebagai peserta ospek. Perkenalan dimulai dari foto bersama pada saat itu",
    },
    {
      id: 2,
      title: "Mulai Serius",
      date: "2019",
      image: "/hero/photo4.jpg",
      description:
        "Setelah beberapa waktu dekat, akhirnya pada tahun 2019 sama-sama mengikat janji untuk saling serius karna keyakinan kami masing-masing untuk melanjutkan hubungan ke arah yang serius.",
    },
    {
      id: 3,
      title: "Menikah",
      date: "2025",
      image: "/hero/gallery_04.jpg",
      description:
        "Jika sudah menjadi takdir walaupun LDR 2 tahun (2022-2024) tidak membuat pudar keyakinan kami untuk terus bersama dan saling menguatkan hingga kami bisa melaksanakan keinginan terbesar kami untuk menikah.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute("data-index"));
              newSet.add(index);
            }
          });
          return newSet;
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".timeline-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-gray-100 px-6 py-12 rounded-xl">
      <h1
        className={`text-center text-5xl mb-12 font-serif ${BonVivantFont.className}`}
      >
        Cerita Kami
      </h1>

      <div className="relative" ref={timelineRef}>
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />

        {timelineData.map((item, index) => (
          <div key={item.id} data-index={index} className="timeline-item">
            <TimelineItem
              item={item}
              index={index}
              isVisible={visibleItems.has(index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
