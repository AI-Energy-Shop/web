'use client';
import React from 'react';
import Navbar from './navigations/Navbar';
import Footer from './navigations/Footer';

interface NavigationWrapperProps {
  children: React.ReactNode;
  path: string;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  children,
  path,
}) => {
  return (
    <div className="w-full h-auto">
      {!path.includes('admin') && <Navbar path={path} />}
      <div>{children}</div>
      {!path.includes('admin') && <Footer />}
    </div>
  );
};

export default NavigationWrapper;
