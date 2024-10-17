import React from 'react';
import Spacer from '../Spacer';
import Carousel from '../WebsiteUI/Carousel';
import { BannerImages } from '@/lib/types';

interface SliderSectionProps {
  bannerImages: BannerImages[];
}
const SliderSection: React.FC<SliderSectionProps> = ({ bannerImages }) => {
  return (
    <section className="banner-section w-full h-auto md:h-[40.4vh] lg:max-h-[33.3vh]">
      <div className="inner-container max-w-[1200px] h-full m-auto">
        <Carousel.ImageCarousel bannerImages={bannerImages} />
        <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" />
      </div>
    </section>
  );
};

export default SliderSection;
