import React from 'react';
import Carousel from '../carousels/Home/ImageCarousel';
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
    <section>{/* <Carousel.ImageCarousel slides={data.slides} /> */}</section>
  );
};

export default SliderSection;
