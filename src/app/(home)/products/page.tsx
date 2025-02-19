export const dynamic = 'force-dynamic';
import ProductList from '@/components/products/ProductList';
import Breadcrumb from '@/components/products/Breadcrumb';
import Categories from '@/components/products/Categories';
import Brands from '@/components/products/Brands';
import { products } from '@/app/actions/products';
import { PRODUCT_CATEGORIES } from '@/constant';
import { getProductSpecification } from '@/utils/productArray';
import { removeDuplicates } from '@/utils/array';
import PageTitle from '@/components/products/PageTitle';

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { start, limit, page, pageSize } = await searchParams;

  const { products: productsData } = await products({
    pagination: {
      page: page ? Number(page) : INITIAL_PAGE,
      pageSize: pageSize ? Number(pageSize) : INITIAL_PAGE_SIZE,
    },
  });

  // const brands = getProductSpecification(productsData, 'Brand');
  // const powerRatings = getProductSpecification(productsData, 'Power Rating');
  // const inverterTypes = getProductSpecification(productsData, 'Inverter Type');
  // const phaseSupport = getProductSpecification(productsData, 'Phase Support');
  // const gridSupport = getProductSpecification(productsData, 'Grid Support');
  // const mttps = getProductSpecification(productsData, 'No. of MPPTs');
  // const prodWarranty = getProductSpecification( productsData, 'Product Warranty');

  // const filters = [
  //   {
  //     id: 1,
  //     name: 'Brands',
  //     value: removeDuplicates(brands, 'value'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Power Rating',
  //     value: removeDuplicates(powerRatings, 'value'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Inverter Type',
  //     value: removeDuplicates(inverterTypes, 'value'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Phase Support',
  //     value: removeDuplicates(phaseSupport, 'value'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Grid Support',
  //     value: removeDuplicates(gridSupport, 'value'),
  //   },
  //   {
  //     id: 5,
  //     name: 'No. of MPPTs',
  //     value: removeDuplicates(mttps, 'value'),
  //   },
  //   {
  //     id: 7,
  //     name: 'Product Warranty',
  //     value: removeDuplicates(prodWarranty, 'value'),
  //   },
  // ];

  return (
    <div className="min-h-screen bg-[#fdf6ed]">
      <Breadcrumb />
      <Categories categories={PRODUCT_CATEGORIES} />
      <div className="max-w-[1200px] mx-auto py-2">
        <PageTitle title="All Products" />
        {/* <Brands brands={brands} /> */}
        <ProductList
          data={productsData}
          start={Number(start) || undefined}
          limit={Number(limit) || undefined}
          currentPage={Number(page) || INITIAL_PAGE}
          pageSize={Number(pageSize) || INITIAL_PAGE_SIZE}
          // filters={filters}
        />
      </div>
    </div>
  );
}
