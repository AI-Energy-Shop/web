import { products } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Components from '@/components';
import { Package, Search, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

const ProductsPage = async () => {
  const { data, error, loading } = await products();

  return (
    <main className="w-full h-auto">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Products
          </h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search products" className="pl-8" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Products
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {data?.products?.length}
                    </dd>
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
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      120
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Customers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      250
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Products
            </h2>
            <Button>
              <Link href={'/admin/dashboard/products/new'}>
                Add New Product
              </Link>
            </Button>
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
