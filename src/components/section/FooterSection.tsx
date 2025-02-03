import { BonVivantFont, Lora, PlayFair } from "@/style/fonts";
import Flex from "../Flex";
// import FooterButtons from "./FooterButtons"; // Uncomment if needed
import React from "react";
import Text from "../Text";
import Image from "next/image";

const FooterSection = () => {
  return (
    <Flex
      as="section"
      direction="column"
      justify="start" // Align the main content to the start (top)
      align="center"
      className="w-full h-screen relative text-center"
    >
      <div className="absolute inset-0 opacity-40">
        <Image
          quality={100}
          src="/hero/hero_06.jpg"
          layout="fill"
          objectFit="cover"
          alt="background"
          className="-z-10 rounded-[1.25rem]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 z-10 relative pt-20">
        {/* <Text
          className={`text-46pxr leading-42pxr medium:text-50pxr medium:leading-48pxr regular:text-56pxr regular:leading-54pxr large:text-56pxr large:leading-56pxr uppercase ${BonVivantFont.className}`}
        >
          THANK YOU
        </Text> */}
        <Text
          className={`text-16pxr leading-25pxr ${PlayFair.className}`}
          display="block"
        >
          Kami Yang Berbahagia,
        </Text>
        <Text
          display="inline-block"
          className={`text-16pxr leading-45pxr medium:text-24pxr medium:leading-57pxr large:text-32pxr large:leading-64pxr whitespace-pre-line ${BonVivantFont.className}`}
        >
          Sultan & Natasya
        </Text>
        <Text
          className={`text-16pxr leading-25pxr whitespace-pre-line ${BonVivantFont.className}`}
          display="inline-block"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
          kami. Atas kehadiran dan doanya kami mengucapkan terimakasih
        </Text>
        <Text
          className={`${BonVivantFont.className} text-16pxr leading-25pxr whitespace-pre-line`}
          display="inline-block"
        >
          Wassalamualaikum Warahmatullahi Wabarakatuh
        </Text>

        <div className="flex justify-center mt-4">
          <a
            href="https://www.instagram.com/baseectech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <Image
              src="/logo-outline.svg" // Replace with your company logo path
              alt="Baseec"
              width={32} // Set your desired width
              height={32} // Set your desired height
              className="inline-block"
            />
          </a>
        </div>
      </div>
      {/* "Made with love" text at the bottom */}
      <div className="absolute bottom-0 w-full p-4 z-10 flex items-center justify-center">
        <Text className="text-10pxr leading-25pxr mr-2 text-bold">
          Made with ♡ by{" "}
          <a
            href="https://baseec.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bold underline"
          >
            Baseec
          </a>
        </Text>
      </div>
    </Flex>
  );
};

export default FooterSection;
