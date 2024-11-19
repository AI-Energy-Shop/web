import Carousel from '@/components/custom-ui/Carousel';
import { ChevronRight } from 'lucide-react';

import ProductPrice from '@/components/Product-front-page/ProductPrice';
import ProductDescription from '@/components/Product-front-page/ProductDescription';

function ProductPage() {
  return (
    <main className="bg-yellow-light-yellow">
      {/* Breadcrumbs */}
      <section className="py-2">
        <div className="ae-mobile-container ae-non-mobile-container font-sm font-thin flex flex-wrap gap-1">
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
        {/* title and description */}
        <div className="ae-mobile-container p-2">
          <h1 className="text-2xl md:text-3xl leading-5 font-semibold">
            Solplanet 5kW S-G2 Series Single Phase Inverter
          </h1>
          <p className="font-semibold italic md:text-lg text-blue-navy-blue">
            ASW5000-S-G2
          </p>
        </div>

        <div className="md:flex">
          <div className="ae-mobile-container p-2 flex-1">
            {/* Carousel Image */}
            <div className="px-2">
              <Carousel.ProductCarousel />
            </div>
          </div>
          <div className="flex-1">
            <ProductPrice />
          </div>
        </div>
      </section>

      <ProductDescription />

      {/* Related Products */}
      <section className="bg-yellow-light-yellow py-2">
        <div className="space-y-2">
          <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container mx-auto">
            Related Products
          </h1>
          <div className="ae-non-mobile-container">
            <Carousel.ProductRecoCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
