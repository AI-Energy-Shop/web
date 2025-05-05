import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDownIcon, ShoppingCart } from 'lucide-react';
import OrderList from '@/components/Orders/OrderList';
import { orders } from '@/app/actions/orders';

export default async function OrderPage() {
  const { data } = await orders();

  return (
    <main className="min-h-screen w-full bg-gray-50 p-5">
      <div className="mx-auto space-y-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h1 className="font-semibold">Orders</h1>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  More actions
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <Button size="sm">Create order</Button>
          </div>
        </div>

        <OrderList data={data.orders} />

        <p className="text-sm text-blue-600 mt-4 text-center">
          Learn more about orders
        </p>
      </div>
    </main>
  );
}
