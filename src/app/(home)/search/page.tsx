import PageTitle from '@/components/products/PageTitle';
import { Input } from '@/components/ui/input';
import React from 'react';

const SearchPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <h1 className="text-center text-2xl font-bold">Search results</h1>

        <div className="flex items-center justify-center">
          <Input placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
