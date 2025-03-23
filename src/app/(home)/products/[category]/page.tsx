import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';
import {
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
  PRODUCT_CATEGORIES,
} from '@/constant';
import { capitalizeAllFirstChar } from '@/utils/string';
import PageTitle from '@/components/products/PageTitle';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const { page, pageSize } = await searchParams;

  const categoryName = capitalizeAllFirstChar(category.replace('-', ' '));

  const { data } = await products({
    filters: {
      category: {
        contains: categoryName,
      },
    },
    pagination: {
      page: page ? Number(page) : INITIAL_PAGE,
      pageSize: pageSize ? Number(pageSize) : INITIAL_PAGE_SIZE,
    },
  });

  return (
    <div className="min-h-screen bg-[#fdf6ed]">
      <Breadcrumb />
      <Categories categories={PRODUCT_CATEGORIES} />
      <div className="max-w-[1200px] mx-auto p-5 md:p-5 lg:p-5 flex flex-col lg:gap-5">
        <PageTitle title="All Products" />
        <Brands products={data?.products} />
        <ProductList data={data?.products} category={categoryName} />
      </div>
    </div>
  );
}
