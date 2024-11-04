import React from 'react';
import Spacer from '../Spacer';
import Carousel from '../custom-ui/Carousel';
import type { SliderSlide } from '@/lib/types';

interface SliderSectionProps {
  data: {
    data: {
      slides: SliderSlide[]
    }
  };
}
const SliderSection: React.FC<SliderSectionProps> = ({ data }) => {
  return (
    <section className="banner-section w-full h-auto md:h-[40.4vh] lg:max-h-[33.3vh]">
      <div className="inner-container max-w-[1200px] h-full m-auto">
        <Carousel.ImageCarousel slides={data.data.slides} />
        <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" />
      </div>
    </section>
  );
};

export default SliderSection;
