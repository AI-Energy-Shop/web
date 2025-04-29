import { products } from '@/app/actions/products';
import ProductList from '@/components/products/ProductList';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { INITIAL_PAGE } from '@/constant';
import React from 'react';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const searchParamsRes = await searchParams;
  const page = Number(searchParamsRes.page) || INITIAL_PAGE;
  const pageSize = Number(searchParamsRes.pageSize) || INITIAL_PAGE_SIZE;
  const { data } = await products({
    filters: {},
    pagination: {},
  });

  return (
    <div className="w-full min-h-screen">
      <ProductList data={data?.products} page={page} pageSize={pageSize} />
    </div>
  );
};

export default SearchPage;
