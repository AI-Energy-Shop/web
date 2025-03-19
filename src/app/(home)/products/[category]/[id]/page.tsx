import ShopProductStockQuantities from '@/components/products/ShopProductStockQuantities';
import ProductDescription from '@/components/products/ProductDescription';
import RelatedProducts from '@/components/products/RelatedProducts';
import ProductPrice from '@/components/products/ProductPrice';
import BulkPrices from '@/components/products/BulkPrices';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductAddToCartButton from '@/components/products/ProductAddToCartButton';
import Carousel from '@/components/custom-ui/Carousel';
import { product } from '@/app/actions/products';
import { firaSans } from '@/app/font';
import { cn } from '@/lib/utils';
async function ProductPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const { data } = await product(id);

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
            {data?.product?.name}
          </h1>
          <p className="font-medium text-lg md:text-2xl italic">
            {data?.product?.model}
          </p>
        </div>

        <div className="md:flex md:justify-between md:px-12 md:pb-5">
          <div className="ae-mobile-container max-md:w-4/5 max-md:max-w-96 md:basis-[40%] md:max-w-[40%]">
            <Carousel.ProductCarousel product={data?.product} />
          </div>
          <div className="md:basis-[51.75%] md:max-w-[51.75%]">
            <ProductPrice product={data?.product} />
            <BulkPrices product={data?.product} />
            <ShopProductStockQuantities product={data?.product} />
            <ProductAddToCartButton product={data?.product} />
          </div>
        </div>
      </section>

      <ProductDescription productData={data?.product} />
      <RelatedProducts />
    </main>
  );
}

export default ProductPage;
