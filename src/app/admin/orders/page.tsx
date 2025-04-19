import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDownIcon, SearchIcon, FilterIcon, DownloadIcon, PlusIcon } from 'lucide-react';

export default function OrderList() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center justify-center gap-x-4">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More actions
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Bulk edit</DropdownMenuItem>
              <DropdownMenuItem>Print packing slips</DropdownMenuItem>
              <DropdownMenuItem>Print invoices</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unfulfilled">Unfulfilled</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search orders" />
        </div>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Fulfillment status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Delivery method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type="checkbox" className="rounded border-gray-300" />
            </TableCell>
            <TableCell>#1003</TableCell>
            <TableCell>Today at 2:34 pm</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>₱2,240.00</TableCell>
            <TableCell>
              <Badge className="bg-green-500 hover:bg-green-500/80">Paid</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">Partially fulfilled</Badge>
            </TableCell>
            <TableCell>2 items</TableCell>
            <TableCell>Express shipping</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <input type="checkbox" className="rounded border-gray-300" />
            </TableCell>
            <TableCell>#1002</TableCell>
            <TableCell>Today at 1:18 am</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>₱1,120.00</TableCell>
            <TableCell>
              <Badge className="bg-green-500 hover:bg-green-500/80">Paid</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">Fulfilled</Badge>
            </TableCell>
            <TableCell>1 item</TableCell>
            <TableCell>Standard shipping</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p className="text-sm text-blue-600 mt-4 text-center">Learn more about orders</p>
    </div>
  );
}
