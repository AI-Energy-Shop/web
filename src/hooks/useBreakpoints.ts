'use client';

import { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(0);

  useEffect(() => {
    setCurrentBreakpoint(window.innerWidth);
    window.addEventListener('resize', () => {
      setCurrentBreakpoint(window.innerWidth);
    });

    // Cleanup the event listener on component unmount
    return () =>
      window.removeEventListener('resize', () => {
        setCurrentBreakpoint(window.innerWidth);
      });
  }, []);

  return currentBreakpoint;
};

export default useBreakpoint;
