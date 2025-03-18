'use client';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from '@radix-ui/react-dropdown-menu';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CircleAlert, ChevronDown } from 'lucide-react';
import { ProductQuery } from '@/lib/gql/graphql';
import useMe from '@/hooks/useMe';

interface BulkPricesProps {
  product: ProductQuery['product'];
}

const BulkPrices = ({ product }: BulkPricesProps) => {
  const { me } = useMe();

  const priceList = product?.price_lists?.map((price) => ({
    id: price?.documentId,
    price: price?.price ?? undefined,
    sale_price: price?.sale_price ?? undefined,
    min_quantity: price?.min_quantity ?? undefined,
    max_quantity: price?.max_quantity ?? undefined,
    user_level: price?.user_level ?? undefined,
  }));

  const bulkPrices = priceList?.filter((price) => {
    if (price.user_level === me?.account_detail?.level) {
      if (price.min_quantity || price.max_quantity) {
        return price;
      }
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full md:w-80 h-12 md:h-12 text-center relative border border-black rounded-2xl font-medium select-none">
        <CircleAlert
          fill="black"
          color="white"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        />
        <span>Bulk Pricing available</span>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[92vw] md:w-80 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Qty</TableHead>
              <TableHead>Price Per Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bulkPrices?.map((data: any) => (
              <TableRow key={data?.id}>
                <TableCell>{`${data?.min_quantity}-${data?.max_quantity}`}</TableCell>
                <TableCell>{data?.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BulkPrices;
