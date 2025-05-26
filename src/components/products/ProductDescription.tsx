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
import { GetStoreProductQuery } from '@/lib/gql/graphql';
interface ProductDescriptionProps {
  productData: GetStoreProductQuery['getStoreProduct'];
}

function ProductDescription({ productData }: ProductDescriptionProps) {
  return (
    <>
      {/* mobile */}
      <div className="md:hidden">
        <div>
          <Accordion type="single" collapsible className="bg-gray-50">
            {/* Product Description */}
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger
                className={`${firaSans.className} text-[20px] font-bold py-3 px-6 hover:no-underline  bg-yellow-aes-yellow  text-white`}
              >
                Product Description
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-50">
                <ProductDetailsOverview productData={productData} />
              </AccordionContent>
            </AccordionItem>

            {/* Key Features */}
            <AccordionItem className="border-none" value="item-2">
              <AccordionTrigger
                className={`${firaSans.className} text-[20px] font-bold py-3 px-6 hover:no-underline  bg-orange-orange  text-white`}
              >
                Key Features
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-4 pb-5 bg-gray-50">
                <ProductKeyFeatures data={productData} />
              </AccordionContent>
            </AccordionItem>

            {/* Product Specification */}
            <AccordionItem className="border-none" value="item-3">
              <AccordionTrigger
                className={`${firaSans.className} text-[20px] font-bold py-3 px-6 hover:no-underline  bg-purple-purp-aes  text-white`}
              >
                Specifications
              </AccordionTrigger>
              <AccordionContent className="pb-0 bg-white">
                <ProductSpecification productData={productData} />
              </AccordionContent>
            </AccordionItem>

            {/* Product Downloads */}
            <AccordionItem className="border-b-2 border-b-black" value="item-4">
              <AccordionTrigger
                className={`${firaSans.className} text-[20px] font-bold py-3 px-6 hover:no-underline  bg-blue-navy-blue text-white`}
              >
                Product Downloads
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ProductDownloads productData={productData} />
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
                <ProductDetailsOverview productData={productData} />
                <ProductKeyFeatures data={productData} />
              </div>
              <div className="basis-[35%]">
                <ProductSpecification productData={productData} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="downloads" className="py-6 mt-0 px-12">
            <ProductDownloads productData={productData} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default ProductDescription;
