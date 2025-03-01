import React from 'react';
import Link from 'next/link';
import { NAV_LIST_ITEMS } from '@/constant';
const NavList = () => {
  return (
    <nav className="flex items-end h-full text-sm font-medium gap-3">
      {NAV_LIST_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="transition-colors hover:text-primary font-normal"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavList;
