import React from 'react';
import Spacer from '../Spacer';
import Carousel from '../custom-ui/Carousel';
import type { SliderSlide } from '@/lib/types';

interface SliderSectionProps {
  data: {
    id: string;
    animation_duration: number;
    display_button: any;
    slides: SliderSlide[];
  };
}
const SliderSection: React.FC<SliderSectionProps> = ({ data }) => {
  return (
    <section>
      <Carousel.ImageCarousel slides={data.slides} />
      <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" />
    </section>
  );
};

export default SliderSection;
