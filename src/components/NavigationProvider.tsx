// 'use client';
import React from 'react';
import Navigations from './Navigations';
// import Footer from './Footer/Footer';
// import { usePathname } from 'next/navigation';

interface NavigationProviderProps {
  children: React.ReactNode;
}
const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  // const path = usePathname();
  // const admin = path.includes('admin');
  return (
    // <div className={`h-full grid ${admin ? 'grid-cols-6' : 'grid-cols-1'}`}>
    <div className={`h-full grid grid-cols-6`}>
      {/* { 
        admin ? (
          <div className='h-full w-full col-span-1 border-r border-gray-200 dark:border-gray-700'>
            <Navigations.SideNavigation iconSize={20}/>
          </div>
        ) : 
        (
          <div className='h-full w-full col-span-6'>
            <Navigations.Navigation/>
          </div>
        )
      } */}
      <div className='h-full w-full col-span-1 border-r border-gray-200 dark:border-gray-700'>
          <Navigations.SideNavigation iconSize={20}/>
        </div>
      <div className='h-full w-full col-span-5 border'>
        {children}
      </div>
      {/* {
        !admin && (
          <div className='h-full w-full col-span-6 border'>
            <Footer />
          </div>
        )
      } */}
    </div>
  );
};

export default NavigationProvider;
