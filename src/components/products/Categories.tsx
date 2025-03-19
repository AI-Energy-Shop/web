'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type Category = {
  id: number | string;
  name: string;
  value: string;
  icon: string;
  link: string;
};

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-[#f5efe6] p-5">
      <div className="w-full lg:max-w-[1200px] mx-auto">
        <div className="w-full h-[100px] py-5 flex items-center justify-between gap-10 lg:gap-0 overflow-x-auto">
          {categories.map((category) => (
            <Link
              className="w-full h-full"
              key={category.name}
              href={category.link}
            >
              <div className="w-full h-full flex flex-col items-center gap-1">
                <div className="w-full h-full relative">
                  <Image
                    fill
                    alt={category.name}
                    src={category.icon || '/placeholder.svg'}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="opacity-6 absolute top-0 left-0 w-full h-full object-fit"
                  />
                </div>
                <span
                  className={`text-xs ${pathname === category.link && 'border-b-2 border-black'}`}
                >
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
