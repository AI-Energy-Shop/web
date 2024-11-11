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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto p-4">
          <Components.Cards.ProductsDetails product={data?.product} />
        </div>
      </div>
    </Suspense>
  );
}
