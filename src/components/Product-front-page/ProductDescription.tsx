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

function ProductDescription() {
  return (
    <>
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

      <div className="hidden md:block ae-non-mobile-container bg-white">
        <Tabs defaultValue="details">
          <TabsList className="gap-x-0.5">
            <TabsTrigger
              value="details"
              className="bg-blue-navy-blue/50 text-white/80 disabled:opacity-50 data-[state=active]:bg-blue-navy-blue 
              data-[state=active]:text-white data-[state=active]:shadow-none rounded-none"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="downloads"
              className="bg-blue-navy-blue/50 text-white/80 disabled:opacity-50 data-[state=active]:bg-blue-navy-blue 
              data-[state=active]:text-white data-[state=active]:shadow-none rounded-none"
            >
              Product Downloads
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ProductDetailsOverview />
            <div className="flex">
              <div className="flex-1">
                <ProductKeyFeatures />
              </div>
              <div className="flex-1">
                <ProductSpecification />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="downloads">
            <ProductDownloads />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default ProductDescription;
