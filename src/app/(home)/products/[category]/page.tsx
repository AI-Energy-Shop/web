import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';
import {
  EXCLUDED_SEARCH_PARAMS,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';
import {
  capitalizeAllFirstChar,
  capsAllFirstCharWithDash,
} from '@/utils/string';
import PageTitle from '@/components/products/PageTitle';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string; brandSlug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const searchParamsRes = await searchParams;
  const { page, pageSize, brand } = searchParamsRes;

  const categoryName = capitalizeAllFirstChar(category.replace('-', ' '));

  let filters: any = {};

  if (category && category !== 'all') {
    filters = {
      categories: {
        slug: {
          in: [category],
        },
      },
    };
  }

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
      page: page ? Number(page) : INITIAL_PAGE,
      pageSize: pageSize ? Number(pageSize) : INITIAL_PAGE_SIZE,
    },
  });

  return (
    <div className="min-h-screen">
      <Breadcrumb />
      <Categories />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col lg:gap-5">
        <PageTitle title={categoryName} />
        <Brands />
        <ProductList data={data?.products} />
      </div>
    </div>
  );
}
