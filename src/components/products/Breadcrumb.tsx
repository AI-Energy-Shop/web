'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { capitalizeFirstChar } from '@/utils/string';
import { ChevronRight } from 'lucide-react';
const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-1 md:p-5 lg:p-5">
      <div className="text-sm flex items-center gap-2">
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={path}>
              {index !== 0 && <ChevronRight size={16} />}
              <Link href={path} className="hover:underline">
                {capitalizeFirstChar(
                  decodeURIComponent(segment.replace(/-/g, ' '))
                )}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
