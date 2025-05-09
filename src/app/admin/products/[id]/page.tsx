import { product } from '@/app/actions/products';
import { redirect } from 'next/navigation';
import Components from '@/components';
import { Suspense } from 'react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    redirect('/not-found');
  }

  const { data, errors } = await product(id);

  if (errors) {
    return <div>ERROR {errors.toString()} </div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-auto w-full bg-gray-100 dark:bg-gray-900">
        <Components.Cards.ProductsDetails id={id} product={data?.product} />
      </div>
    </Suspense>
  );
}
