export const dynamic = 'force-dynamic';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constant';
import ProductList from '@/components/products/product-list';
import Breadcrumb from '@/components/products/breadcrumb';
import Categories from '@/components/products/categories';
import PageTitle from '@/components/products/page-title';
import Brands from '@/components/products/brands';
import { products } from '@/app/actions/products';
import { COLLECTIONS } from '@/constant/collections';

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsRes = await searchParams;
  const page = Number(searchParamsRes.page) || INITIAL_PAGE;
  const pageSize = Number(searchParamsRes.pageSize) || INITIAL_PAGE_SIZE;

  const { data } = await products({
    filters: {},
    pagination: {
      page,
      pageSize,
    },
  });

  return (
    <div className="w-full min-h-screen">
      <Breadcrumb />
      <Categories acceptedCollections={COLLECTIONS} />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <PageTitle />
        <Brands />
        <ProductList data={data?.products} page={page} pageSize={pageSize} />
      </div>
    </div>
  );
}
