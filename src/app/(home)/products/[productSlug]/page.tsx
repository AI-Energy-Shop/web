import { cn } from '@/lib/utils';
import { firaSans } from '@/app/font';
import Breadcrumb from '@/components/layout/breadcrumb';
import { storeProduct } from '@/app/actions/products';
import RelatedProducts from '@/components/products/single-product/related-products';
import ProductDescription from '@/components/products/single-product/product-description';
import SingleProductDetails from '@/components/products/single-product/single-product-details';
import ProductCarousel from '@/components/carousels/CustomerProduct/products-carousel';

async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const res = await storeProduct(productSlug);
  const product = res?.data?.getStoreProduct;

  return (
    <main className="w-full min-h-screen">
      <Breadcrumb />
      <section className="bg-white max-w-[1200px] mx-auto px-4 py-8">
        <div
          className={cn(
            `${firaSans.className} max-md:px-4 ae-mobile-container md:px-12 md:p-6`
          )}
        >
          <h1 className="text-2xl max-sm:pt-2 md:text-4xl font-bold">
            {product?.name}
          </h1>
          <p className="font-medium text-lg md:text-2xl italic">
            {product?.model}
          </p>
        </div>

        <div className="md:flex md:justify-between md:px-12 md:pb-5">
          <div className="ae-mobile-container max-md:w-4/5 max-md:max-w-96 md:basis-[40%] md:max-w-[40%]">
            <ProductCarousel product={product} />
          </div>
          <SingleProductDetails product={product} />
        </div>
      </section>

      <ProductDescription productData={product} />
      <RelatedProducts data={product} />
    </main>
  );
}

export default ProductPage;
export const dynamic = 'force-dynamic';
