export const dynamic = 'force-dynamic';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constant';
import ProductList from '@/components/products/product-list';
import PageTitle from '@/components/products/page-title';
import { products } from '@/app/actions/products';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default async function ProductsPage({
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

  if (!data) {
    return null;
  }

  return (
    <div className="w-full min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }
      >
        <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
          <PageTitle />
          <ProductList data={data?.products} page={page} pageSize={pageSize} />
        </div>
      </Suspense>
    </div>
  );
}
