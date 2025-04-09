import { products } from '@/app/actions/products';
import {
  Brands,
  Breadcrumb,
  Categories,
  PageTitle,
  ProductList,
} from '@/components/products';
import {
  EXCLUDED_SEARCH_PARAMS,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';
import {
  capitalizeAllFirstChar,
  capsAllFirstCharWithDash,
} from '@/utils/string';
import React from 'react';

interface BrandSlugPageProps {
  params: Promise<{ category: string; brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BrandSlugPage = async ({ params, searchParams }: BrandSlugPageProps) => {
  const paramsRes = await params;
  const searchParamsRes = await searchParams;
  const { page, pageSize, brand } = searchParamsRes;

  let filters: any = {};

  Object.keys(searchParamsRes)
    .filter((key) => !EXCLUDED_SEARCH_PARAMS.includes(key))
    .forEach((key) => {
      const value = searchParamsRes[key];

      if (key === 'brand') {
        if (brand instanceof Array) {
          filters = { ...filters, brand: { url: { in: brand } } };
        } else {
          filters = { ...filters, brand: { url: { in: [brand] } } };
        }
      } else {
        const capitalizeKey = capsAllFirstCharWithDash(key);
        filters = {
          ...filters,
          specifications: {
            ...filters?.specification,
            key: {
              eq: capitalizeKey,
            },
            value: {
              in: Array.isArray(value)
                ? value.map((val) => val.toLocaleLowerCase())
                : [value?.toLocaleLowerCase()],
            },
          },
        };
      }
    });

  const { data } = await products({
    filters: {
      brand: {
        url: {
          eq: paramsRes.brand,
        },
      },
      ...filters,
    },
    pagination: {
      page: Number(page) || INITIAL_PAGE,
      pageSize: Number(pageSize) || INITIAL_PAGE_SIZE,
    },
  });

  return (
    <main className="w-full min-h-screen bg-[#fdf6ed]">
      <Breadcrumb />
      <Categories />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <PageTitle title={capitalizeAllFirstChar(paramsRes.brand)} />
        <Brands selectedBrands={[paramsRes.brand]} />
        <ProductList data={data?.products} />
      </div>
    </main>
  );
};

export default BrandSlugPage;
