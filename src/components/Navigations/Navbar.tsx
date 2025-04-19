'use client';
import NavList from './NavList';
import NavSearchBar from './Search/NavSearchBar';
import CartButton from './CartButton';
import UserIconButton from './UserIconButton';
import WarehouseIconButton from './WarehouseIconButton';
import Logo from './Logo';
import SideNavigation from './SideNavigation';
import { NAV_LIST_ITEMS } from '@/constant';
import { useState, useEffect } from 'react';
interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`z-50 w-full h-auto border-b bg-white ${isFixed ? 'fixed' : 'relative'}`}>
      <div className="flex max-w-[1200px] h-20 items-end justify-between mx-auto py-[0.5rem]">
        <Logo />
        <NavList data={NAV_LIST_ITEMS} />
        <NavSearchBar />
        <div className="gap-2 items-end h-full hidden lg:flex">
          <WarehouseIconButton />
          <UserIconButton />
          <CartButton />
        </div>
      </div>
      <SideNavigation />
    </header>
  );
};

export default NavigationBar;
