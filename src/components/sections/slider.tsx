import React from 'react';
import { ImageCarousel } from '../carousels';

interface SliderSectionProps {
  data: {
    id: string;
    animation_duration: number;
    display_button: any;
    slides: any[];
  };
}
const SliderSection: React.FC<SliderSectionProps> = ({ data }) => {
  return (
    <section>
      <ImageCarousel slides={data.slides} />
    </section>
  );
};

export default SliderSection;
