import Carousel from '@/components/custom-ui/Carousel';
import { ChevronRight } from 'lucide-react';
import { firaSans } from '@/app/font';
import ProductPrice from '@/components/Product-front-page/ProductPrice';
import ProductDescription from '@/components/Product-front-page/ProductDescription';
import { product } from '@/app/actions';

async function ProductPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data, error, loading } = await product(id);

  const productData = data?.product;

  return (
    <main className="bg-yellow-light-yellow pt-[75px]">
      {/* Breadcrumbs */}
      <section className="py-4">
        <div
          className={`ae-mobile-container ae-non-mobile-container text-[14px] md:text-[16px] font-thin flex flex-wrap gap-1`}
        >
          <p className="underline">Home</p>
          <ChevronRight className="w-5" />
          <p className="underline">Products</p>
          <ChevronRight className="w-5" />
          <p className="underline">Solplanet</p>
          <ChevronRight className="w-5" />
          <p className="underline">Inverters</p>
          <ChevronRight className="w-5" />
          <p className="underline">Single Phase</p>
        </div>
      </section>

      {/* Product */}
      <section className="bg-white lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div
          className={`${firaSans.className} max-md:px-4 ae-mobile-container md:px-12 md:pt-6`}
        >
          <h1 className="text-2xl md:text-4xl font-bold">
            {productData?.name}
          </h1>
          <p className="font-medium text-lg md:text-2xl italic">ASW5000-S-G2</p>
        </div>

        <div className="md:flex md:justify-between md:px-12 md:pb-5">
          <div className="ae-mobile-container max-md:w-4/5 max-md:max-w-96 md:basis-[40%] md:max-w-[40%]">
            <Carousel.ProductCarousel />
          </div>
          <div className="md:basis-[51.75%] md:max-w-[51.75%]">
            <ProductPrice />
          </div>
        </div>
      </section>

      <ProductDescription />

      {/* Related Products */}
      <section className="bg-yellow-light-yellow pt-6 pb-12 ">
        <div>
          <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container mx-auto md:px-12 mb-4">
            Related Products
          </h1>
          <div className="ae-non-mobile-container md:px-12">
            <Carousel.ProductRecoCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
