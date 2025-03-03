import React from 'react';
import Link from 'next/link';
import { NAV_LIST_ITEMS } from '@/constant';
import { usePathname } from 'next/navigation';

const NavList = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden items-end h-full text-sm font-medium gap-3 lg:flex">
      {NAV_LIST_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`transition-colors hover:text-primary  ${
            pathname === item.href
              ? 'border-b-2 border-red-500 font-bold'
              : 'font-normal'
          }`}
        >
          {item.label}
          <div className="gradientbar w-full h-[4px] bg-transparent ease-in-out duration-300 opacity-0" />
        </Link>
      ))}
    </nav>
  );
};

export default NavList;
