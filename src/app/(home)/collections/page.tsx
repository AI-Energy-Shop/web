export const dynamic = 'force-dynamic';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constant';
import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import PageTitle from '@/components/products/PageTitle';
import Brands from '@/components/products/Brands';
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
