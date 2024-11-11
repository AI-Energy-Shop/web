'use client';
import React from 'react';
import Navigations from './Navigations';
import Footer from './Footer/Footer';
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
      <div className={!path.includes('admin') ? 'pt-[75px]' : ''}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default NavigationProvider;
