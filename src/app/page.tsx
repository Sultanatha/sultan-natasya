import dynamic from "next/dynamic";
import WeddingScroll from "@/components/WeddingScroll";

// Dynamically import GoogleAnalytics with SSR disabled
// const GoogleAnalytics = dynamic(() => import("@/components/GoogleAnalytics"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <>
      {/* GoogleAnalytics will only be rendered on the client side */}
      {/* <GoogleAnalytics trackingId="G-3F9MPE4K7V" /> */}
      <WeddingScroll />
    </>
  );
}
