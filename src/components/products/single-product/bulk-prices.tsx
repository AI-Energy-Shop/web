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
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import useMe from '@/hooks/useMe';

interface BulkPricesProps {
  priceList: {
    documentId: string | undefined;
    price: number;
    comparePrice: number;
    min_quantity: number;
    max_quantity: number;
    user_level: string;
  }[];
}

const BulkPrices = ({ priceList }: BulkPricesProps) => {
  const { user } = useMe();
  const bulkPrices = priceList?.filter(
    (price) => price.user_level === user?.account_detail?.level
  );

  if (bulkPrices?.length === 0) {
    return null;
  }

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
            {!user ? (
              <TableRow>
                <TableCell>Login to view bulk pricing</TableCell>
              </TableRow>
            ) : (
              bulkPrices?.map((data: any) => (
                <TableRow key={data?.documentId}>
                  <TableCell>{`${data?.min_quantity}-${data?.max_quantity}`}</TableCell>
                  <TableCell>
                    {data?.sale_price
                      ? `${data?.sale_price}`
                      : `${data?.price}`}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BulkPrices;
