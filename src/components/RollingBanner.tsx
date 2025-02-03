import React, { Fragment } from "react";

import Glare from "../../public/glare/glare_white.svg";
import Text from "./Text";

const BANNERS = Array.from({ length: 3 }).map(
  () => "21 Februari 2025, 08.00 - 17.00 WIB"
);
const RollingBanner = () => {
  return (
    <div
      id="rolling-banner"
      className="wrapper overflow-hidden will-change-auto rounded-xl"
    >
      <div className="slide-container bg-gray-100 text-black py-10pxr text-14pxr leading-24pxr will-change-auto">
        <ul className="slide-wrapper will-change-auto">
          <div className="slide-original will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
          <div className="slide-clone will-change-auto">
            {BANNERS.map((banner, i) => (
              <Fragment key={i}>
                <Glare className="flex-none inline" />
                <Text>{banner}</Text>
              </Fragment>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default RollingBanner;
