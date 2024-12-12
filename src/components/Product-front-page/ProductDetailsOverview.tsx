import { muktaVaani } from '@/app/font';
import { ProductQuery } from '@/lib/gql/graphql';

interface ProductDetailsOverviewProps {
  productData: ProductQuery['product'];
}

function ProductDetailsOverview({ productData }: ProductDetailsOverviewProps) {
  return (
    <p className={`${muktaVaani.className}`}>{productData?.description}</p>
  );
}

export default ProductDetailsOverview;
