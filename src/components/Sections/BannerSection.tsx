import React from "react";
import Spacer from "../Spacer";
import Carousel from "../UI/Carousel";
import { BannerImages } from "@/libs/types";

interface BannerSectionProps {
  desktopImages: BannerImages[];
  tabletImages: BannerImages[];
  mobileImages: BannerImages[];
}
const BannerSection: React.FC<BannerSectionProps> = ({
  desktopImages,
  tabletImages,
  mobileImages,
}) => {
  return (
    <section className="banner-section w-full h-auto md:h-[40.4vh] lg:max-h-[33.3vh]">
      <div className="inner-container max-w-[1200px] h-full m-auto">
        <Carousel.ImageCarousel
          desktopImages={desktopImages}
          tabletImages={tabletImages}
          mobileImages={mobileImages}
        />
        <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" />
      </div>
    </section>
  );
};

export default BannerSection;
