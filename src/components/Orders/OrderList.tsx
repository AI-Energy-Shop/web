import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrdersQuery } from '@/lib/gql/graphql';

interface Order {
  data: OrdersQuery['orders'];
}

const OrderList = ({ data }: Order) => {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      <Tabs defaultValue="all" className="mb-1 bg-white ">
        <TabsList className="gap-1 bg-white">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unfulfilled">Unfulfilled</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-12">
              <Input
                width={10}
                height={10}
                type="checkbox"
                className="rounded w-5 h-5 border-gray-300"
              />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Fulfillment status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Delivery method</TableHead>
            <TableHead>Delivery status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map?.((order) => {
            return (
              <TableRow key={order?.documentId}>
                <TableCell>
                  <Input
                    width={10}
                    height={10}
                    type="checkbox"
                    className="rounded w-5 h-5 border-gray-300"
                  />
                </TableCell>
                <TableCell>{order?.orderNumber}</TableCell>
                <TableCell>
                  {new Date(order?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{order?.user?.business_name}</TableCell>
                <TableCell>
                  {order?.total?.currency} {order?.total?.amount?.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500 hover:bg-green-500/80">
                    {order?.paymentStatus?.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {order?.fulfillmentStatus?.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell> items</TableCell>
                <TableCell>
                  {order?.shippingType
                    ?.replace(/_/g, ' ')
                    .toLocaleUpperCase('en-US')}
                </TableCell>
                <TableCell>
                  {order?.deliveryStatus?.toLocaleUpperCase('en-US')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
