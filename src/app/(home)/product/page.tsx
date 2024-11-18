import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import Carousel from '@/components/custom-ui/Carousel';
import { Check, ChevronRight, Minus, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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

          <div className="mobile-container mx-auto p-2 text-center space-y-2">
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
      </section>

      {/* Product Description */}
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline border border-x-0 bg-gray-200/80 border-y-black">
              Product Description
            </AccordionTrigger>
            <AccordionContent className="mt-4 bg-gray-50">
              <div className="px-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima autem in earum itaque nulla. Impedit provident est
                  sint, delectus autem voluptatem facilis sed! Dicta a corrupti
                  doloremque beatae adipisci incidunt, animi impedit assumenda
                  aspernatur, sed earum. Maxime laboriosam nihil soluta saepe
                  molestias, vero dolorum. Dignissimos voluptatibus nihil
                  doloremque dolorum, voluptate dolorem et! In sint aliquid
                  cupiditate, quidem a porro, assumenda iure maxime, iste quis
                  aperiam dolores voluptatem laudantium dicta amet consequatur
                  laboriosam? Tempore, voluptatum temporibus.
                </p>
                <ul className="list-disc px-4">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam, molestias?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam, molestias?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam, molestias?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam, molestias?
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Product Specification */}
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline  bg-blue-navy-blue text-white ">
              Specification
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              {new Array(5).fill(0).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center px-4 gap-x-2 py-2  ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
                  >
                    <h1 className="flex-1 text-right font-bold">Brand</h1>
                    <h1 className="flex-1 text-left">Solplanet</h1>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Product Specification */}
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline  bg-black text-white ">
              Product Downloads
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              {new Array(5).fill(0).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`py-2 px-4 ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
                  >
                    <h1 className="underline">
                      Solplanet ASW5000-S-G2 Datasheet
                    </h1>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Related Products */}
      <section className="bg-yellow-light-yellow py-2">
        <div className="mobile-container mx-auto space-y-2">
          <h1 className="text-xl font-bold">Related Products</h1>
          <div>
            <Card>
              <CardHeader>
                <div className="h-44 relative">
                  <Image
                    fill
                    src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
                    alt="product image"
                    className="object-contain object-center"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl font-bold">
                  Solplanet 6kW S-G2 Series Single Phase Inverter
                </h1>
                <h2 className="font-thin text-lg italic">ASW6000-S-G2</h2>
                <h3 className="text-sm line-through">$1250.20</h3>
                <h3 className="font-semibold text-lg">
                  $1,160.00 <span className="text-sm">ex.GST</span>
                </h3>
              </CardContent>
              <CardFooter>
                <div className="flex flex-1 border border-black">
                  <div
                    role="button"
                    className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                  >
                    <Minus />
                  </div>
                  <div className="flex-3 border border-x-black flex items-center justify-center">
                    <p>1</p>
                  </div>
                  <div
                    role="button"
                    className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                  >
                    <Plus />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
