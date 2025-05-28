import React from 'react';
import { COLLECTIONS } from '@/constant/collections';
import Breadcrumb from '@/components/products/breadcrumb';
import SidebarFilters from '@/components/products/filter/SidebarFilters';
import { Brands, Categories, PageTitle } from '@/components/products';
import SortOption from '@/components/products/options/SortOption';
import MobileButton from '@/components/products/filter/MobileButton';
interface CollectionLayoutProps {
  children: React.ReactNode;
}

const CollectionLayout = ({ children }: CollectionLayoutProps) => {
  return (
    <div className="w-full min-h-screen px-2 lg:px-0">
      <Breadcrumb />
      <Categories acceptedCollections={COLLECTIONS} />
      <div className="max-w-[1200px] py-5 mx-auto flex flex-col gap-5 lg:gap-5">
        <PageTitle />
        <Brands />

        <div className="products flex gap-8">
          <SidebarFilters />
          <div className="flex-1">
            <div className="justify-end gap-2 m-2 hidden md:flex">
              <SortOption />
            </div>
            <MobileButton />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionLayout;
