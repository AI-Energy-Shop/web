import { muktaVaani } from '@/app/font';
import { ProductQuery } from '@/lib/gql/graphql';
import DOMPurify from 'isomorphic-dompurify';

interface ProductDetailsOverviewProps {
  productData: ProductQuery['product'];
}

function ProductDetailsOverview({ productData }: ProductDetailsOverviewProps) {
  const sanitizedHtml = DOMPurify.sanitize(productData?.description!);

  return (
    <div
      className={`${muktaVaani.className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default ProductDetailsOverview;
