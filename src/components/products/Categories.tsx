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
    <div className="bg-[#f5efe6] py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-5 gap-2 justify-center text-center">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 relative">
                  <Image
                    src={category.icon || '/placeholder.svg'}
                    alt={category.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={40}
                    height={40}
                    className="opacity-6 absolute top-0 left-0 w-full h-full object-fit"
                  />
                </div>
                <span
                  className={`text-sm ${pathname === category.link && 'border-b-2 border-black'}`}
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
