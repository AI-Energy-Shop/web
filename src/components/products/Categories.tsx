import React from 'react';
import Image from 'next/image';

interface CategoriesProps {
  categories: { name: string; icon: string }[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="bg-[#f5efe6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-4 justify-center text-center">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={category.icon || '/placeholder.svg'}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="opacity-60"
                />
              </div>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
