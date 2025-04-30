'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { capsAllFirstCharWithDash } from '@/utils/string';

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto px-3 py-1 md:p-5 lg:p-5">
      <div className="text-sm flex items-center gap-2">
        {pathSegments.map((segment, index) => {
          if (index === 0) {
            segment = 'Home';
          }
          const path =
            index === 0
              ? '/'
              : `/${pathSegments.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={path}>
              {index !== 0 && <ChevronRight size={16} />}
              <Link href={path} className="hover:underline">
                {capsAllFirstCharWithDash(segment)}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
