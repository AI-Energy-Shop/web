import ProductList from '@/components/products/ProductList';
import {
  EXCLUDED_SEARCH_PARAMS,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';
import {
  capsAllFirstCharWithDash,
  capsAllFirstCharWithUnderScore,
} from '@/utils/string';
import { getCollectionWithProducts } from '@/app/actions/collections';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await params;
  const searchParamsRes = await searchParams;
  const page = Number(searchParamsRes.page) || INITIAL_PAGE;
  const pageSize = Number(searchParamsRes.pageSize) || INITIAL_PAGE_SIZE;

  let filters: any = {};

  Object.keys(searchParamsRes)
    .filter((key) => !EXCLUDED_SEARCH_PARAMS.includes(key))
    .forEach((key) => {
      const value = searchParamsRes[key];
      const capitalizeKey = capsAllFirstCharWithDash(key);

      switch (key) {
        case 'brand':
          if (Array.isArray(value)) {
            filters = {
              ...filters,
              brand: { name: { in: value } },
            };
          } else {
            filters = {
              ...filters,
              brand: { name: { eq: value } },
            };
          }
          break;
        case 'product-type':
          if (Array.isArray(value)) {
            filters = {
              ...filters,
              product_type: { in: value },
            };
          } else {
            filters = {
              ...filters,
              product_type: { eq: value },
            };
          }
          break;
        default:
          filters = {
            ...filters,
            specifications: {
              ...filters?.specification,
              key: {
                eq: capsAllFirstCharWithUnderScore(capitalizeKey),
              },
              value: {
                in: Array.isArray(value) ? value.map((val) => val) : [value],
              },
            },
          };
      }
    });

  const res = await getCollectionWithProducts({
    collectionsFilters: {
      handle: {
        eq: collection,
      },
    },
    productsFilters: {
      ...filters,
    },
    productsPagination: {
      page,
      pageSize,
    },
  });

  const collectionData = res?.collections.at(0);
  const products = collectionData?.products || [];

  if (!collectionData) {
    return 'No Product Data';
  }

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }
      >
        <ProductList data={products} page={page} pageSize={pageSize} />
      </Suspense>
    </div>
  );
}
