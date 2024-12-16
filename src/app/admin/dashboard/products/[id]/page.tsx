import { product } from '@/app/actions';
import { redirect } from 'next/navigation';
import Components from '@/components';
import { Suspense } from 'react';

export default async function ProductManagement({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    redirect('/not-found');
  }

  const { data, error } = await product(params.id);

  if (error) {
    return <div>ERROR {error.toString()} </div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-auto w-full bg-gray-100 dark:bg-gray-900">
        <Components.Cards.ProductsDetails product={data?.getProduct} />
      </div>
    </Suspense>
  );
}
