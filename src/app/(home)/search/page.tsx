import { products } from '@/app/actions/products';
import ProductList from '@/components/products/ProductList';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { INITIAL_PAGE } from '@/constant';
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SearchResults = async ({ searchParams }: SearchPageProps) => {
  const page = Number(searchParams.page) || INITIAL_PAGE;
  const pageSize = Number(searchParams.pageSize) || INITIAL_PAGE_SIZE;
  const searchQuery = searchParams.search as string;
  const brands = Array.isArray(searchParams.brand)
    ? searchParams.brand
    : searchParams.brand
      ? [searchParams.brand]
      : [];
  const productType = searchParams['product-type'] as string;

  const { data } = await products({
    filters: {
      and: [
        {
          or: [
            {
              name: { contains: searchQuery },
            },
            {
              model: { contains: searchQuery },
            },
            {
              product_type: { contains: searchQuery },
            },
            {
              categories: {
                or: [
                  {
                    title: { contains: searchQuery },
                  },
                  {
                    slug: { contains: searchQuery },
                  },
                ],
              },
            },
          ],
        },
        ...(brands.length > 0
          ? [
              {
                brand: {
                  name: { in: brands },
                },
              },
            ]
          : []),
        ...(productType
          ? [
              {
                product_type: { contains: productType },
              },
            ]
          : []),
      ],
    },
    pagination: {
      page,
      pageSize,
    },
  });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ProductList data={data?.products} page={page} pageSize={pageSize} />
    </Suspense>
  );
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  return (
    <div className="w-full min-h-screen">
      <SearchResults searchParams={searchParams} />
    </div>
  );
};

export default SearchPage;
