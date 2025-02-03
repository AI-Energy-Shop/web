import { muktaVaani } from '@/app/font';
import { GetProductQuery } from '@/lib/gql/graphql';
import DOMPurify from 'isomorphic-dompurify';

interface ProductDetailsOverviewProps {
  productData: GetProductQuery['getProduct'];
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
