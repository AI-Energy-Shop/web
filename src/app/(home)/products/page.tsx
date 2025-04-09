export const dynamic = 'force-dynamic';
import {
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
  EXCLUDED_SEARCH_PARAMS,
} from '@/constant';
import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import { capsAllFirstCharWithDash } from '@/utils/string';
import Categories from '@/components/products/Categories';
import PageTitle from '@/components/products/PageTitle';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsRes = await searchParams;
  const { brand } = searchParamsRes;
  const page = Number(searchParamsRes.page) || INITIAL_PAGE;
  const pageSize = Number(searchParamsRes.pageSize) || INITIAL_PAGE_SIZE;
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
    filters,
    pagination: {
      page,
      pageSize,
    },
  });

  return (
    <div className="w-full min-h-screen">
      <Breadcrumb />
      <Categories />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <PageTitle title="All Products" />
        <Brands />
        <ProductList data={data?.products} />
      </div>
    </div>
  );
}
