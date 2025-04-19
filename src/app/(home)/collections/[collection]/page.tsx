import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import Brands from '@/components/products/Brands';
import { EXCLUDED_SEARCH_PARAMS, INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constant';
import { capitalizeAllFirstChar, capsAllFirstCharWithDash } from '@/utils/string';
import PageTitle from '@/components/products/PageTitle';
import { getCollectionWithProducts } from '@/app/actions/collections';
import { COLLECTIONS } from '@/constant/collections';

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

  const collectionName = capitalizeAllFirstChar(collection.replace('-', ' '));

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
                eq: capitalizeKey,
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

  const collections = res?.collections.at(0);
  const products = collections?.products || [];

  return (
    <div className="min-h-screen">
      <Breadcrumb />
      <Categories acceptedCollections={COLLECTIONS} />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col lg:gap-5">
        <PageTitle title={collectionName} />
        <Brands />
        <ProductList data={products} showFilters={true} />
      </div>
    </div>
  );
}
