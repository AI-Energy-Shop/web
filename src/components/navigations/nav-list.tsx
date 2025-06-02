'use client';
import React from 'react';
import Icon from '../Icon';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

type Data = {
  id: number;
  label: string;
  href: string;
  icon: any;
  enabled: boolean;
};

interface NavListProps {
  data: Data[];
  className?: string;
  showIcon?: boolean;
  pathname?: string;
}

const NavList = ({
  data,
  className,
  showIcon = false,
  pathname,
}: NavListProps) => {
  const router = useRouter();

  const handleClick = (item: Data) => {
    if (item.enabled) {
      router.push(item.href);
    }
  };

  return (
    <nav
      className={`hidden items-end h-full text-sm font-medium gap-8 lg:flex ${className}`}
    >
      {data.map((item) => {
        const isPath = pathname === item.href;
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={cn(
              `transition-all duration-100 hover:text-primary group ${
                item.enabled ? 'cursor-pointer' : 'cursor-not-allowed'
              } ${isPath ? 'border-b-2 border-red-500 font-bold' : 'font-normal'}`
            )}
          >
            <div className="flex items-center gap-2">
              {showIcon && (
                <div className="w-5 h-5 flex items-center justify-center">
                  <Icon
                    name={item.icon}
                    size={15}
                    className="transition-all duration-200 group-hover:scale-110"
                  />
                </div>
              )}
              {item.label}
            </div>
            <div className="gradientbar w-full h-[4px] bg-gradient-to-r from-primary/50 to-primary/20 ease-in-out duration-300 opacity-0 group-hover:opacity-100" />
          </div>
        );
      })}
    </nav>
  );
};

export default NavList;
