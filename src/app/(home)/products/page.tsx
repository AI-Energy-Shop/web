import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import PageTitle from '@/components/products/PageTitle';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';
import {
  PRODUCT_CATEGORIES,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page, pageSize } = await searchParams;

  const { data } = await products({
    filters: {},
    pagination: {
      page: Number(page) || INITIAL_PAGE,
      pageSize: Number(pageSize) || INITIAL_PAGE_SIZE,
    },
  });

  return (
    <div className="min-h-screen bg-[#fdf6ed]">
      <Breadcrumb />
      <Categories categories={PRODUCT_CATEGORIES} />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col gap-5 lg:gap-5">
        <PageTitle title="All Products" />
        <Brands products={data?.products} />
        <ProductList data={data?.products} />
      </div>
    </div>
  );
}
