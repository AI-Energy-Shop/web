'use client';
import React from 'react';
import Navbar from './navigations/nav-bar';
import Footer from './navigations/footer';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ children }) => {
  return (
    <div className="w-full h-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default NavigationWrapper;
