import { product } from '@/app/actions/products';
import { redirect } from 'next/navigation';
import Components from '@/components';
import { Suspense } from 'react';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    redirect('/not-found');
  }

  try {
    const { data, errors } = await product(id);

    if (errors || !data) {
      throw new Error(errors?.toString() || 'No data found');
    }

    return (
      <Suspense fallback={<p>Loading...</p>}>
        <div className="h-auto w-full bg-gray-100 dark:bg-gray-900">
          <Components.Cards.ProductsDetails id={id} product={data?.product} />
        </div>
      </Suspense>
    );
  } catch (error) {
    // This will trigger the error boundary
    throw error;
  }
}
