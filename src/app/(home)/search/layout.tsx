import React from 'react';
import SearchBar from '@/components/Navigations/Search/SearchBar';
import SidebarFilters from '@/components/products/filter/SidebarFilters';
interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CollectionLayout = ({ children }: CollectionLayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <div className="flex flex-col gap-5 lg:gap-5 m-auto w-[700px]">
          <h1 className="text-center text-2xl font-bold">Search results</h1>
          <SearchBar />
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="products flex gap-8">
          <SidebarFilters />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CollectionLayout;
