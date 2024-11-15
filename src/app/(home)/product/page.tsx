import { firaSans, muktaVaani } from '@/app/font';
import Carousel from '@/components/custom-ui/Carousel';
import { Check, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

function ProductPage() {
  return (
    <main>
      {/* Breadcrumbs */}
      <section className="bg-yellow-light-yellow py-2">
        <div className="mobile-container font-sm font-thin flex flex-wrap gap-1">
          <p className="underline">Home</p>
          <ChevronRight className="w-5" />
          <p className="underline">Products</p>
          <ChevronRight className="w-5" />
          <p className="underline">Solplanet</p>
          <ChevronRight className="w-5" />
          <p className="underline">Inverters</p>
          <ChevronRight className="w-5" />
          <p className="underline">Single Phase</p>
        </div>
      </section>

      {/* Product */}
      <section className="mobile-container p-2 space-y-2">
        {/* Product title and description */}
        <div>
          <h1 className="text-2xl leading-5 font-semibold">
            Solplanet 5kW S-G2 Series Single Phase Inverter
          </h1>
          <p className="font-semibold italic">ASW5000-S-G2</p>
        </div>
        {/* Carousel Image */}
        <div className="px-2">
          <Carousel.ProductCarousel />
        </div>

        {/* Product price */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-gray-500 line-through">$1100.20</h2>
            <h1 className="text-2xl font-bold">$1,000.20</h1>
            <p className="text-base">ex.GST</p>
          </div>
          <div className="w-24 bg-red-500 h-8"></div>
        </div>

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
      </section>

      {/* Select Order Location */}
      <section className="bg-yellow-light-yellow">
        <div className="mobile-container mx-auto space-y-2">
          <div className="p-2 space-y-2">
            <h1 className="font-2xl font-bold">Select Order Location</h1>

            <div className="flex justify-between items-center p-2 pl-8 border border-b-blue-navy-blue rounded-2xl bg-white ">
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
          <Separator className="bg-blue-navy-blue" />
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
