export const dynamic = 'auto';
import { Package, PackageSearch, ShoppingCart, Users } from 'lucide-react';
import { products } from '@/app/actions/products';
import { Button } from '@/components/ui/button';
import Components from '@/components';
import Link from 'next/link';

const ProductsPage = async () => {
  const { data } = await products();
  return (
    <main className="w-full h-auto p-5">
      {/* Header */}
      <header className="mx-auto space-y-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <PackageSearch className="h-5 w-5" />
            <h1 className="font-semibold">Products</h1>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="w-full mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Products
                    </dt>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {data?.products?.length}
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Revenue
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      $50,000
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">2</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Customers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">2</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">All Products</h2>
            <Link href={'/admin/dashboard/products/new'}>
              <Button size="sm">Add Product</Button>
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <Components.Tables.ProductsTable products={data?.products} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
