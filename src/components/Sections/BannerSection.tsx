"use client";
import React from "react";
import Spacer from "../Spacer";
import Carousel from "../UI/Carousel";
import BANNER_OPERATION from "@/graphql/banner";
import { useQuery } from "@apollo/client";

const BannerSection = () => {
  const { data, loading } = useQuery(BANNER_OPERATION.Queries.getBannerImages);

  if (loading) {
    return (
      <div className="max-w-[1200px] h-[44.4vh] lg:max-h-[33.3vh] m-auto">
        Loading...
      </div>
    );
  }

  const {
    bannerImages: { data: images },
  } = data;

  return (
    <section className="banner-section w-full h-auto md:h-[40.4vh]  lg:max-h-[33.3vh]">
      <div className="inner-container max-w-[1200px] h-full m-auto">
        <Carousel.ImageCarousel data={images} />
        <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" />
      </div>
    </section>
  );
};

export default BannerSection;
