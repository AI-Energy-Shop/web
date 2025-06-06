import ProductErrorBoundary from '@/components/error-boundary/product-error-boudery';
import ProductsDetails from '@/components/product-details/product-details';
import { product } from '@/app/actions/products';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const { data, errors } = await product(id);

    return (
      <ProductErrorBoundary>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <div className="h-auto w-full bg-gray-100">
            <ProductsDetails id={id} product={data?.product} />
          </div>
        </Suspense>
      </ProductErrorBoundary>
    );
  } catch (error) {
    throw error;
  }
}
