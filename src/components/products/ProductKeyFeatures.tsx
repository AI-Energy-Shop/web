import { firaSans } from '@/app/font';
import { ProductQuery } from '@/lib/gql/graphql';

interface ProductKeyFeaturesProps {
  data?: ProductQuery['product'];
}

function ProductKeyFeatures({ data }: ProductKeyFeaturesProps) {
  const keyFeatures = data?.key_features;

  return (
    <div className="md:w-4/5 md:mt-8">
      <h1 className={`${firaSans.className} hidden md:block font-bold text-2xl text-purple-purp-aes mb-4`}>
        Key Features
      </h1>
      <ul className="list-disc px-4 md:px-0">
        {keyFeatures?.map((feature) => <li key={feature?.id}>{feature?.feature}</li>)}
      </ul>
    </div>
  );
}

export default ProductKeyFeatures;
