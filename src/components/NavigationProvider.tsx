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
      {children}
      <Footer />
    </div>
  );
};

export default NavigationProvider;
