export const dynamic = 'force-dynamic';
import ShopProductStockQuantities from '@/components/products/shop-product-sock-quantities';
import ProductDescription from '@/components/products/product-description';
import RelatedProducts from '@/components/products/related-products';
import ProductPrice from '@/components/products/product-price';
import BulkPrices from '@/components/products/bulk-prices';
import Breadcrumb from '@/components/products/breadcrumb';
import ProductAddToCartButton from '@/components/products/product-add-to-cart-button';
import Carousel from '@/components/carousels';
import { storeProduct } from '@/app/actions/products';
import { firaSans } from '@/app/font';
import { cn } from '@/lib/utils';

async function VariantPage({ params }: { params: { variantId: string } }) {
  const id = (await params).variantId;
  const { data } = await storeProduct(id);

  return (
    <main className="bg-yellow-light-yellow">
      <Breadcrumb />
      <section className="bg-white max-w-[1200px] mx-auto px-4 py-8">
        <div
          className={cn(
            `${firaSans.className} max-md:px-4 ae-mobile-container md:px-12 md:p-6`
          )}
        >
          <h1 className="text-2xl max-sm:pt-2 md:text-4xl font-bold">
            {data?.getStoreProduct?.name}
          </h1>
          <p className="font-medium text-lg md:text-2xl italic">
            {data?.getStoreProduct?.model}
          </p>
        </div>

        <div className="md:flex md:justify-between md:px-12 md:pb-5">
          <div className="ae-mobile-container max-md:w-4/5 max-md:max-w-96 md:basis-[40%] md:max-w-[40%]">
            <Carousel.ProductCarousel product={data?.getStoreProduct} />
          </div>
          <div className="md:basis-[51.75%] md:max-w-[51.75%]">
            <ProductPrice product={data?.getStoreProduct} />
            <BulkPrices product={data?.getStoreProduct} />
            <ShopProductStockQuantities product={data?.getStoreProduct} />
            <ProductAddToCartButton product={data?.getStoreProduct} />
          </div>
        </div>
      </section>

      <ProductDescription productData={data?.getStoreProduct} />
      <RelatedProducts data={data?.getStoreProduct} />
    </main>
  );
}

export default VariantPage;
