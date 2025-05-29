import ShopProductStockQuantities from '@/components/products/shop-product-sock-quantities';
import ProductAddToCartButton from '@/components/products/product-add-to-cart-button';
import ProductDescription from '@/components/products/product-description';
import ImageCarousel from '@/components/carousels/image-carousel/image-carousel';
import RelatedProducts from '@/components/products/related-products';
import ProductPrice from '@/components/products/product-price';
import BulkPrices from '@/components/products/bulk-prices';
import { Breadcrumb } from '@/components/products';
import { storeProduct } from '@/app/actions/products';
import { firaSans } from '@/app/font';
import { cn } from '@/lib/utils';

async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const res = await storeProduct(productSlug);
  const product = res?.data?.getStoreProduct;

  if (!product) {
    return <div>Product not found</div>;
  }

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
            <ImageCarousel slides={product?.images} />
          </div>
          <div className="md:basis-[51.75%] md:max-w-[51.75%]">
            <ProductPrice product={product} />
            <BulkPrices product={product} />
            <ShopProductStockQuantities product={product} />
            <ProductAddToCartButton product={product} />
          </div>
        </div>
      </section>

      <ProductDescription productData={product} />
      <RelatedProducts data={product} />
    </main>
  );
}

export default ProductPage;
export const dynamic = 'force-dynamic';
