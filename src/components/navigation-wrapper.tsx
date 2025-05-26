'use client';
import React from 'react';
import Navbar from './navigations/nav-bar';
import Footer from './navigations/footer';
import { usePathname } from 'next/navigation';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="w-full h-auto">
      {!pathname?.includes('admin') && <Navbar path={pathname || '/'} />}
      <div>{children}</div>
      {!pathname?.includes('admin') && <Footer />}
    </div>
  );
};

export default NavigationWrapper;
