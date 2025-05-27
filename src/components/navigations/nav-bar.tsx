'use client';
import SearchBar from './search/search-bar';
import CartButton from './cart-icon';
import Logo from './Logo';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import SideNavigation from './side-navigation';
import { cn } from '@/lib/utils';
import NavList from './nav-list';
import { NAV_LIST_ITEMS } from '@/constant/navigations';
import WarehouseIconButton from './warehouse-icon';
import UserIconButton from './user-icon';
import { usePathname } from 'next/navigation';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const pathname = usePathname();

  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname && pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* MOBILE */}
      <header
        className={cn(
          'lg:hidden',
          'z-50 w-full h-auto border-b bg-white',
          isFixed ? 'fixed' : 'relative'
        )}
      >
        <div className="flex items-center justify-between px-2 gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="icon"
          >
            <Menu size={50} />
          </Button>
          <Logo />
          <SearchBar />
          <CartButton cartStyle="icon" />
        </div>
      </header>

      {/* DESKTOP */}
      <header
        className={cn(
          'hidden lg:block',
          'z-50 w-full h-auto border-b border-gray-200 bg-white',
          isFixed ? 'fixed' : 'relative'
        )}
      >
        <div className="flex max-w-[1200px] mx-auto items-end py-3">
          <Logo />
          <div className="flex flex-col gap-2 ml-[100px]">
            <SearchBar />
            <NavList pathname={pathname} data={NAV_LIST_ITEMS} />
          </div>
          <div className="h-full flex items-end gap-2 ml-auto">
            <WarehouseIconButton />
            <UserIconButton />
            <CartButton cartStyle="icon" />
          </div>
        </div>
      </header>

      <SideNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default NavigationBar;
