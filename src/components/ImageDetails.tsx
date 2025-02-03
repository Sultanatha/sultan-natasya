"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Close from "../../public/close.svg";
import Flex from "./Flex";
import Portal from "./Portal";
import Spacing from "./Spacing";
import Text from "./Text";

const ImageDetails = ({
  images,
  onClose,
  isOpen,
  selectedIndex,
  onSlideChange
}: {
  isOpen: boolean;
  images: { url: string }[];
  onClose: () => void;
  selectedIndex: number;
  onSlideChange: (index: number) => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed w-full top-0 left-2/4 large:max-w-[430px]"
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          transform: `translate(-50%)`
        }}
      ></div>
      <div
        className="fixed w-full z-20 left-2/4  large:max-w-[430px]"
        style={{ transform: `translate(-50%)`, minHeight: "100vh" }}
      >
        <Flex
          className=" w-full py-4pxr px-10pxr"
          direction="row"
          justify="space-between"
          align="center"
        >
          <div className="flex-[1_1_0%]"></div>
          <div className="flex-[1_1_0%] text-white font-bold text-15pxr leading-25pxr">
            <Text className="">
              {selectedIndex < 9 ? `0${selectedIndex + 1}` : selectedIndex + 1}
            </Text>
            <Text style={{ color: "rgba(255, 255, 255, 0.3)" }}>
              {" "}
              / {images.length}
            </Text>
          </div>

          <Close className="cursor-pointer flex-none" onClick={onClose} />
        </Flex>
        <Spacing size={9} />
        <Swiper
          loop
          initialSlide={selectedIndex}
          slidesPerView={1}
          onSlideChange={(slider) => onSlideChange(slider.realIndex)}
        >
          {images.map((image) => (
            <SwiperSlide key={image.url} className="w-full h-full bg-gray-100">
              <img
                src={image.url}
                width={764}
                height={1146}
                alt="image"
                className="w-full h-full rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Portal>
  );
};

export default ImageDetails;
