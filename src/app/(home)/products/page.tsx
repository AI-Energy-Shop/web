import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import { products } from '@/app/actions/products';
import { PRODUCT_CATEGORIES } from '@/constant';
import PageTitle from '@/components/products/PageTitle';

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { start, limit, page, pageSize } = await searchParams;

  const { data } = await products();

  return (
    <div className="min-h-screen bg-[#fdf6ed]">
      <Breadcrumb />
      <Categories categories={PRODUCT_CATEGORIES} />
      <div className="max-w-[1200px] mx-auto py-2">
        <PageTitle title="All Products" />
        {/* <Brands brands={brands} /> */}
        <ProductList
          data={data?.products}
          start={Number(start) || undefined}
          limit={Number(limit) || undefined}
          currentPage={Number(page) || INITIAL_PAGE}
          pageSize={Number(pageSize) || INITIAL_PAGE_SIZE}
        />
      </div>
    </div>
  );
}
