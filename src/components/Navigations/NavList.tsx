import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavListProps {
  data: any[];
  className?: string;
}

const NavList = ({ data, className }: NavListProps) => {
  const pathname = usePathname();

  return (
    <nav className={`hidden items-end h-full text-sm font-medium gap-3 lg:flex ${className}`}>
      {data.map((item, index) => {
        const isPath = pathname === item.href;
        return (
          <Link
            key={index}
            href={item.href}
            className={`transition-colors hover:text-primary  ${
              isPath ? 'border-b-2 border-red-500 font-bold' : 'font-normal'
            }`}
          >
            {item.label}
            <div className="gradientbar w-full h-[4px] bg-transparent ease-in-out duration-300 opacity-0" />
          </Link>
        );
      })}
    </nav>
  );
};

export default NavList;
