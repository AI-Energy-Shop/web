import { motion } from 'framer-motion';
import { DotProps } from 'react-multi-carousel';

const CustomDot = ({ onClick, active, carouselState, index }: DotProps) => {
  const totalDots = Math.min(carouselState?.totalItems || 0, 3); // Ensure max 3 dots
  const activeIndex = carouselState?.currentSlide! % totalDots; // Cyclic mapping for active dot

  // Determine if the current dot should be active
  const isActive = activeIndex === index;

  return (
    <motion.div
      className={`h-4 w-4 p-0.5 border-2 rounded-full ${
        index! >= totalDots && 'hidden'
      }`}
      onClick={() => onClick!()}
      whileHover={{ scale: 1.2 }} // Add hover animation
    >
      <div
        className={`w-full h-full rounded-full ${
          isActive ? 'bg-slate-800' : ''
        }`}
      />
    </motion.div>
  );
};

export default CustomDot;
