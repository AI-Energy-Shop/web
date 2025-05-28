import React from 'react';
import { ImageCarousel } from '../carousels';
import type { SliderSlide } from '@/lib/types';

interface SliderSectionProps {
  data: {
    id: string;
    animation_duration: number;
    display_button: any;
    images: any[];
  };
}
const SliderSection: React.FC<SliderSectionProps> = ({ data }) => {
  return (
    <section>
      <ImageCarousel images={data.images} />
    </section>
  );
};

export default SliderSection;
