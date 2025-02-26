'use client';
import React from 'react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { NAV_LIST_ITEMS } from '@/constant';
const NavList = () => {
  return (
    <nav className="flex items-end h-full text-sm font-medium py-[0.5rem] gap-3">
      {NAV_LIST_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="transition-colors hover:text-primary font-normal"
        >
          {item.label}
        </Link>
      ))}
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-primary font-normal">
          <span>Products</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-normal">
          <DropdownMenuItem>
            <Link href="/products/solar-panel">Solar Panel</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/inverter">Inverter</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/battery">Energy Storage</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/charger">Charger</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/electrical">Electrical</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
			</DropdownMenu> */}
    </nav>
  );
};

export default NavList;
