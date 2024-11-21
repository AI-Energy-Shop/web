import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Check, CircleAlert, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { firaSans, muktaVaani } from '@/app/font';

function ProductPrice() {
  return (
    <>
      {/* Product price */}
      <div className={`${muktaVaani.className} ae-mobile-container mx-auto`}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-gray-500 line-through font-light text-[28px]">
              $1100.20
            </h2>
            <h1 className="font-medium">
              <span className=" text-[40px]">$1,000</span>
              <span className="text-[28px]">.20</span>
              <span>ex.GST</span>
            </h1>
          </div>
          <div className="w-24 bg-red-500 h-8 md:hidden"></div>
        </div>

        {/* Bulk Price */}
        <Select>
          <SelectTrigger className="w-full md:w-80 md:h-8 md:pl-24 relative">
            <CircleAlert className="absolute left-3 top-1.5 w-4 h-4" />
            <SelectValue
              placeholder="Bulk Pricing Available"
              className={`${muktaVaani.className}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">$100</SelectItem>
            <SelectItem value="200">$200</SelectItem>
            <SelectItem value="300">$300</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-yellow-light-yellow md:bg-white md:mt-6">
        <div className="ae-mobile-container mx-auto space-y-2">
          <div className="max-md:p-2 max-md:space-y-2">
            {/* Select Order Location */}
            <h1 className="font-2xl font-bold md:hidden">
              Select Order Location
            </h1>
            <div
              className={`${firaSans.className} leading-none w-full md:flex md:flex-wrap md:justify-center md:gap-2`}
            >
              <div className="md:basis-[48.31%] md:py-1 md:flex md:justify-between md:items-center border border-black pl-6 pr-5 rounded-2xl">
                <h1 className="font-medium text-[20px]">Melbourne, VIC</h1>
                <div className="text-right">
                  <p className="font-semibold text-[16px]">In Stock</p>
                  <p className="text-sm font-light text-[14px]">Qty.22</p>
                </div>
              </div>
              <div className="gradient-effect p-0.5 rounded-2xl md:basis-[48.31%]">
                <div className="md:py-1 md:h-full md:flex bg-white md:justify-between md:items-center pl-6 pr-5 rounded-2xl relative">
                  <span className="absolute bg-green-900 p-0.5 rounded-full left-1.5 top-1/2 transform -translate-y-1/2">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <h1 className="font-medium text-[20px]">Sydney, NSW</h1>
                  <div className="text-right">
                    <p className="font-semibold text-[16px]">In Stock</p>
                    <p className="text-sm font-light text-[14px]">Qty.100+</p>
                  </div>
                </div>
              </div>
              <div className="md:basis-[48.31%] md:py-1 md:flex md:justify-between md:items-center border border-black pl-6 pr-5 rounded-2xl opacity-70">
                <h1 className="font-medium text-[20px]">Brisbane, QLD</h1>
                <div className="text-right">
                  <p className="font-semibold text-[16px]">Out of Stock</p>
                  <p className="text-sm font-light text-[14px]">On Request</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="bg-purple-purp-aes md:hidden" />
          <div className="ae-mobile-container mx-auto p-2 text-center md:flex md:gap-x-2">
            <div className="md:basis-[38.65%] border border-black rounded-lg md:h-16 grid grid-cols-12 overflow-hidden">
              <div
                className={`${firaSans.className} font-semibold md:col-span-3 bg-gray-300 flex items-center justify-center`}
              >
                Qty
              </div>
              <div className="md:col-span-2 flex items-center justify-center bg-gray-200">
                <Minus />
              </div>
              <div
                className={`${muktaVaani.className} md:col-span-5 flex items-center justify-center`}
              >
                2
              </div>
              <div className="md:col-span-2 flex items-center justify-center bg-gray-200">
                <Plus />
              </div>
              <div
                className={`${muktaVaani.className} font-medium col-span-12 flex items-end justify-center md:border-t md:border-t-black`}
              >
                <span className="md:text-[20px]">$2,000</span>
                <span className="md:text-[16px]">.40</span>
                <span className="md:text-[12px] md:pb-1">ex.GST</span>
              </div>
            </div>
            <Button
              className={`${firaSans.className} w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold md:basis-[57.98%] text-[28px] md:rounded-lg md:h-16`}
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
