'use client';
import React from 'react';
import Navigations from './navigations';
import { usePathname } from 'next/navigation';

interface NavigationProviderProps {
  children: React.ReactNode;
}
const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const path = usePathname();

  return (
    <div className="w-full h-auto">
      {!path.includes('admin') && <Navigations.Navigation />}
      <div>{children}</div>
      {!path.includes('admin') && <Navigations.Footer />}
    </div>
  );
};

export default NavigationProvider;
