import { firaSans, muktaVaani } from '@/app/font';
import { ProductQuery } from '@/lib/gql/graphql';
import { capsAllFirstCharWithDash } from '@/utils/string';

interface ProductSpecificationProps {
  productData: ProductQuery['product'];
}

function ProductSpecification({ productData }: ProductSpecificationProps) {
  return (
    <>
      <h1 className={`hidden md:block ${firaSans.className} text-2xl font-bold text-blue-navy-blue mb-4`}>
        Specifications
      </h1>
      {productData?.specifications?.map((data, index) => (
        <div
          key={data?.documentId}
          className={`flex items-center md:px-1 gap-x-2 py-2 ${muktaVaani.className} ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'}`}
        >
          <h1 className="flex-1 text-right font-semibold">{data?.key.replaceAll('_', ' ')}</h1>
          <h1 className="flex-1 text-left">{capsAllFirstCharWithDash(data?.value || '')}</h1>
        </div>
      ))}
    </>
  );
}

export default ProductSpecification;
