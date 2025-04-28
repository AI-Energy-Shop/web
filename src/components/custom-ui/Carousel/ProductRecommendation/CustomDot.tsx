import React from 'react';
import { DotProps } from 'react-multi-carousel';

function CustomDot({ onClick, active, index, carouselState }: DotProps) {
  const { currentSlide, totalItems } = carouselState!;

  const percentage = ((currentSlide + 2) / totalItems) * 100;

  return (
    <div className="absolute w-[92vw] h-2 border border-blue-navy-blue bottom-0 rounded-full">
      <div
        onClick={onClick}
        className="h-full bg-blue-navy-blue"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default CustomDot;
