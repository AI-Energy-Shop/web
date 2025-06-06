export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { PackageSearch } from 'lucide-react';
import { products } from '@/app/actions/products';
import Components from '@/components';
import { unstable_noStore as noStore } from 'next/cache';

const ProductsPage = async () => {
  noStore(); // Opt out of static rendering
  const { data } = await products();

  return (
    <main className="w-full h-auto p-5">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <header className="w-full mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PackageSearch className="h-5 w-5" />
              <h1 className="font-semibold">Products</h1>
            </div>
          </div>
        </header>

        {/* Product Table */}
        <div className="w-full h-full">
          <Components.Tables.ProductsTable products={data?.products || []} />
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
