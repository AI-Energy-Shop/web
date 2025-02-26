import ProductDescription from '@/components/Products/ProductDescription';
import RelatedProducts from '@/components/Products/RelatedProducts';
import ProductPrice from '@/components/Products/ProductPrice';
import { frontPageGetProduct } from '@/app/actions/products';
import Breadcrumb from '@/components/Products/Breadcrumb';
import AddToCart from '@/components/Products/AddToCart';
import Carousel from '@/components/custom-ui/Carousel';
import { cookies } from 'next/headers';
import { firaSans } from '@/app/font';

async function ProductPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const token = (await cookies()).get('a-token')?.value;
  const { data, error, loading } = await frontPageGetProduct(id);

  const productData = data?.getProduct;

  const priceList = productData?.price_list?.map((price) => ({
    id: price?.id,
    price: price?.price ?? undefined,
    sale_price: price?.sale_price ?? undefined,
    min_quantity: price?.min_quantity ?? undefined,
    max_quantity: price?.max_quantity ?? undefined,
    user_level: price?.user_level ?? undefined,
  }));

  const pickLocation = productData?.inventory?.[0]?.id;

  return (
    <main className="bg-yellow-light-yellow">
      <Breadcrumb />
      <section className="bg-white max-w-[1200px] mx-auto px-4 py-8">
        <div
          className={`${firaSans.className} max-md:px-4 ae-mobile-container md:px-12 md:p-6`}
        >
          <h1 className="text-2xl max-sm:pt-2 md:text-4xl font-bold">
            {productData?.name}
          </h1>
          <p className="font-medium text-lg md:text-2xl italic">ASW5000-S-G2</p>
        </div>

        <div className="md:flex md:justify-between md:px-12 md:pb-5">
          <div className="ae-mobile-container max-md:w-4/5 max-md:max-w-96 md:basis-[40%] md:max-w-[40%]">
            <Carousel.ProductCarousel productData={productData} />
          </div>
          <div className="md:basis-[51.75%] md:max-w-[51.75%]">
            <ProductPrice priceList={priceList} />
            <AddToCart
              id={productData?.odoo_product_id}
              productData={productData}
              pickLocation={pickLocation}
              priceList={priceList}
              image={productData?.images?.[0]?.url}
              productTitle={productData?.name ?? ''}
              odooProductId={productData?.odoo_product_id ?? ''}
              referenceId={'MODEL ID'}
              token={token}
            />
          </div>
        </div>
      </section>

      <ProductDescription productData={productData} />
      <RelatedProducts />
    </main>
  );
}

export default ProductPage;
