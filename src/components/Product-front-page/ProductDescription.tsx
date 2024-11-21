import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductDetailsOverview from './ProductDetailsOverview';
import ProductKeyFeatures from './ProductKeyFeatures';
import ProductSpecification from './ProductSpecification';
import ProductDownloads from './ProductDownloads';
import { firaSans } from '@/app/font';

function ProductDescription() {
  return (
    <>
      {/* mobile */}
      <div className="md:hidden">
        {/* Product Description */}
        <div>
          <Accordion type="single" collapsible className="bg-gray-50">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline border border-x-0 bg-gray-200/80 border-y-black">
                Product Description
              </AccordionTrigger>
              <AccordionContent className="mt-4 bg-gray-50">
                <div className="px-4">
                  <ProductDetailsOverview />
                  <ProductKeyFeatures />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Product Specification */}
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline  bg-blue-navy-blue text-white ">
                Specification
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ProductSpecification />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Product Downloads */}
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="text-lg font-bold py-3 px-6 hover:no-underline  bg-black text-white ">
                Product Downloads
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ProductDownloads />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* tablet/desktop */}
      <div className="hidden md:block ae-non-mobile-container bg-white mt-9">
        <Tabs defaultValue="details">
          <TabsList className="m-0 p-0">
            <TabsTrigger
              value="details"
              className={`${firaSans.className} text-2xl px-12 bg-blue-navy-blue/50 text-white/80 disabled:opacity-50 data-[state=active]:bg-blue-navy-blue 
              data-[state=active]:text-white data-[state=active]:shadow-none rounded-none`}
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="downloads"
              className={`${firaSans.className} text-2xl px-12 bg-blue-navy-blue/50 text-white/80 disabled:opacity-50 data-[state=active]:bg-blue-navy-blue 
              data-[state=active]:text-white data-[state=active]:shadow-none rounded-none`}
            >
              Product Downloads
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6 mt-0 px-12">
            <div className="flex justify-between">
              <div className="basis-[50%]">
                <ProductDetailsOverview />
                <ProductKeyFeatures />
              </div>
              <div className="basis-[35%]">
                <ProductSpecification />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="downloads" className="py-6 mt-0 px-12">
            <ProductDownloads />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default ProductDescription;
