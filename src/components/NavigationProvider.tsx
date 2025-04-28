'use client';
import React from 'react';
import Navbar from './Navigations/Navbar';
import { usePathname } from 'next/navigation';
import Footer from './Navigations/Footer';

interface NavigationProviderProps {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const path = usePathname();

  return (
    <div className="w-full h-auto">
      {!path.includes('admin') && <Navbar />}
      <div>{children}</div>
      {!path.includes('admin') && <Footer />}
    </div>
  );
};

export default NavigationProvider;
