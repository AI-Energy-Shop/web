'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { capsAllFirstCharWithDash } from '@/utils/string';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

const BreadcrumbButton = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto md:py-5 lg:py-5">
      <Breadcrumb>
        <BreadcrumbList className="list-none p-0">
          {pathSegments.map((segment, index) => {
            const display =
              index === 0
                ? 'Home'
                : capsAllFirstCharWithDash(decodeURIComponent(segment));
            const path =
              index === 0
                ? '/'
                : `/${pathSegments.slice(0, index + 1).join('/')}`;

            return (
              <React.Fragment key={path}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink href={path} className="hover:underline">
                    {display}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbButton;
