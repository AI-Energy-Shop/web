import React from 'react';
import { COLLECTIONS } from '@/constant/collections';
import Breadcrumb from '@/components/layout/breadcrumb';
import SidebarFilters from '@/components/products/filter/SidebarFilters';
import Brands from '@/components/layout/brands/brands';
import SortOption from '@/components/products/options/SortOption';
import MobileButton from '@/components/products/filter/MobileButton';
import PageTitle from '@/components/layout/page-title';
import Categories from '@/components/layout/categories/categories';
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
            <MobileButton />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionLayout;
