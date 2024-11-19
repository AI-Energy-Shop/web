import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { Check, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

function ProductPrice() {
  return (
    <>
      {/* Product price */}
      <div className="ae-mobile-container mx-auto p-2">
        <div className="flex justify-between">
          <div>
            <h2 className="text-gray-500 line-through">$1100.20</h2>
            <h1 className="text-2xl font-bold">$1,000.20</h1>
            <p className="text-base">ex.GST</p>
          </div>
          <div className="w-24 bg-red-500 h-8 md:hidden"></div>
        </div>

        {/* Bulk Price */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bulk Pricing Available" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">$100</SelectItem>
            <SelectItem value="200">$200</SelectItem>
            <SelectItem value="300">$300</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-yellow-light-yellow md:bg-white">
        <div className="ae-mobile-container mx-auto space-y-2">
          <div className="p-2 space-y-2">
            {/* Select Order Location */}
            <h1 className="font-2xl font-bold">Select Order Location</h1>
            <div className="flex justify-between items-center p-2 pl-8 border border-blue-navy-blue rounded-2xl bg-white ">
              <h1 className="font-bold">Melbourne, VIC</h1>
              <div className="text-right">
                <p className="font-bold">In Stock</p>
                <p className="font-thin">Qty. 22</p>
              </div>
            </div>
            <div className="p-1 rounded-2xl gradient-effect relative">
              <span className="absolute bg-green-700 rounded-full p-[2px] left-2 top-1/2 transform -translate-y-1/2">
                <Check color="white" className="w-4 h-4" />
              </span>
              <div className="flex justify-between items-center p-2 pl-8 bg-white rounded-xl ">
                <h1 className="font-bold">Sydney, NSW</h1>
                <div className="text-right">
                  <p className="font-bold">In Stock</p>
                  <p className="font-thin">Qty. 100+</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 pl-8 border border-blue-navy-blue rounded-2xl bg-white opacity-70">
              <h1 className="font-bold">Brisbane, QLD</h1>
              <div className="text-right">
                <p className="font-bold">Out Of Stock</p>
                <p className="font-thin">Available On Request</p>
              </div>
            </div>
          </div>
          <Separator className="bg-purple-purp-aes" />
          <div className="ae-mobile-container mx-auto p-2 text-center space-y-2">
            <div className="flex border border-blue-navy-blue rounded-2xl overflow-hidden">
              <div className="flex-2 flex items-center justify-center font-bold px-3 py-2 bg-gray-200 border border-r-black">
                QTY
              </div>
              <div
                role="button"
                className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 cursor-pointer"
              >
                <Minus className="w-5" />
              </div>
              <div className="flex-2 flex items-center justify-center px-3 py-2 bg-white border border-l-gray-400 border-r-gray-400">
                2
              </div>
              <div
                role="button"
                className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 cursor-pointer"
              >
                <Plus className="w-5" />
              </div>
              <div className="flex-3 flex items-center justify-center px-3 py-2 bg-gray-200 border border-l-black">
                <p className="font-bold">
                  $2,000.40 <span className="text-xs font-light">ex.GST</span>
                </p>
              </div>
            </div>
            <Button className="w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPrice;
