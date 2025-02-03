'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronDown, CircleAlert, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { firaSans, muktaVaani } from '@/app/font';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetProductQuery } from '@/lib/gql/graphql';
import { useState } from 'react';
import { Input } from '../ui/input';
import { formatPriceWithCommas } from '@/utils/formatPriceWithCommas';
import { getCentsInAmount } from '@/utils/getCentsInAmount';

interface ProductPriceProps {
  productData: GetProductQuery['getProduct'];
}

function ProductPrice({ productData }: ProductPriceProps) {
  const [pickLocation, setPickLocation] = useState<string | undefined>(
    productData?.inventory?.[0]?.id
  );

  const productPrice = productData?.price_list?.find(
    (price) => price?.min_quantity === null && price?.max_quantity === null
  );

  const salePrice = productPrice?.sale_price
    ? `$${formatPriceWithCommas(productPrice?.price!)}.${getCentsInAmount(productPrice?.price!)}`
    : '';

  const currentPriceWholeNumber = productPrice?.sale_price
    ? formatPriceWithCommas(productPrice?.sale_price)
    : formatPriceWithCommas(productPrice?.price!);

  const currentPriceCent = productPrice?.sale_price
    ? getCentsInAmount(productPrice?.sale_price!)
    : getCentsInAmount(productPrice?.sale_price!);

  const initialCost = productPrice?.sale_price || productPrice?.price;

  const [qty, setQty] = useState<number>(0);

  const totalCost = initialCost! * qty;

  const bulkPricing = productData?.price_list?.filter(
    (price) => price?.min_quantity !== null || price?.max_quantity !== null
  );

  return (
    <>
      {/* Product price */}
      <div
        className={`${muktaVaani.className} ae-mobile-container mx-auto max-md:px-4 pb-4`}
      >
        <div className="flex justify-between">
          <div className="leading-6">
            <h2 className="text-gray-500 line-through font-light md:text-[28px]">
              {salePrice}
            </h2>
            <h1 className="font-medium md:mt-1">
              <span className=" text-[40px]">${currentPriceWholeNumber}</span>
              <span className="text-[28px]">.{currentPriceCent}</span>
              <span className="max-md:text-[12px] max-md:block">ex.GST</span>
            </h1>
          </div>
          <div className="w-24 bg-red-500 h-8 md:hidden"></div>
        </div>

        {/* Bulk Price */}
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
                {bulkPricing?.map((data) => (
                  <TableRow key={data?.id}>
                    <TableCell>{`${data?.min_quantity}-${data?.max_quantity}`}</TableCell>
                    <TableCell>{data?.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-yellow-light-yellow max-md:px-4 md:bg-white md:mt-6">
        <div className="ae-mobile-container mx-auto">
          <div className="max-md:py-4 max-md:px-2 max-md:space-y-2">
            {/* Select Order Location */}
            <h1 className="font-2xl font-bold md:hidden">
              Select Order Location
            </h1>
            <div
              className={`${firaSans.className} max-md:space-y-3 leading-none w-full md:flex md:flex-wrap md:justify-center md:gap-2`}
            >
              {productData?.inventory?.map((location) => (
                <div
                  className={`p-0.5 rounded-2xl md:basis-[48.31%] cursor-pointer 
                  ${pickLocation === location?.id ? 'gradient-effect' : 'bg-black '}
                  ${location?.quantity === 0 && 'opacity-50 cursor-no-drop'}
                  `}
                  key={location?.id}
                  onClick={() => {
                    if (location?.quantity! > 0) {
                      setPickLocation(location?.id!);
                    }
                  }}
                >
                  <div className="md:py-1 max-md:h-12 md:h-full flex justify-between items-center pl-6 pr-5 rounded-2xl relative bg-white">
                    {pickLocation === location?.id && (
                      <span className="absolute bg-green-900 p-0.5 rounded-full left-1.5 top-1/2 transform -translate-y-1/2">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <h1 className="font-medium text-[20px]">
                      {location?.location}
                    </h1>
                    <div className="text-right">
                      <p className="font-semibold text-[16px]">
                        {location?.quantity! < 1 ? 'Out of Stock' : `In Stock`}
                      </p>
                      <p className="text-sm font-light text-[14px]">
                        {location?.quantity! > 100
                          ? 'Qty.100+'
                          : location?.quantity === 0
                            ? 'On Request'
                            : `Qty.${location?.quantity}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Separator className="bg-purple-purp-aes mb-4 mt-1 md:hidden" />
          <div className="ae-mobile-container mx-auto text-center max-md:px-2 md:mt-6 md:py-2 md:flex md:justify-between">
            <div className="flex md:basis-[38.65%] border border-black rounded-lg h-9 md:h-16 md:grid md:grid-cols-12 overflow-hidden">
              <div
                className={`${firaSans.className} flex-1 font-semibold md:col-span-3 bg-gray-300 flex items-center justify-center`}
              >
                Qty
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
                onClick={() =>
                  setQty((prev) => {
                    if (prev === 0) {
                      return 0;
                    } else {
                      return --prev;
                    }
                  })
                }
              >
                <Minus />
              </Button>
              <Input
                className={`${muktaVaani.className} flex-2 md:col-span-5 text-center bg-white no-spinner`}
                value={qty}
                type="number"
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <Button
                size="icon"
                variant="ghost"
                className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
                onClick={() => setQty((prev) => ++prev)}
              >
                <Plus />
              </Button>
              <div
                className={`${muktaVaani.className} flex-3 bg-white font-medium col-span-12 flex items-center md:items-end justify-center md:border-t md:border-t-black`}
              >
                <span className="md:text-[20px]">
                  ${formatPriceWithCommas(totalCost)}
                </span>
                <span className="md:text-[16px]">
                  .{getCentsInAmount(totalCost)}
                </span>
                <span className="md:text-[12px] md:pb-1">ex.GST</span>
              </div>
            </div>
            <Button
              className={`${firaSans.className} max-md:mt-3 max-md:mb-5 w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold md:basis-[57.98%] text-[20px] md:text-[28px] md:rounded-lg md:h-16`}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPrice;
