import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from '@radix-ui/react-dropdown-menu';
import { CircleAlert, ChevronDown } from 'lucide-react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BulkPricesProps {
  prices: any;
}

const BulkPrices = ({ prices }: BulkPricesProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full md:w-80 h-8 md:h-8 text-center relative border border-black rounded-lg font-medium">
        <CircleAlert className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        <span>Bulk Pricing available</span>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[92vw] md:w-80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Qty</TableHead>
              <TableHead>Price Per Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices?.map((data: any) => (
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
