import { muktaVaani } from '@/app/font';
import { ProductQuery } from '@/lib/gql/graphql';
import { Download } from 'lucide-react';
import Link from 'next/link';

interface ProductDownloadsProps {
  productData: ProductQuery['product'];
}

function ProductDownloads({ productData }: ProductDownloadsProps) {
  return (
    <div className={`${muktaVaani.className}`}>
      {productData?.files?.map((item, index) => {
        return (
          <div
            key={item?.documentId}
            className={`py-2 px-4 ${index % 2 === 0 ? 'bg-gray-200/80' : 'bg-gray-50'} flex items-center justify-between`}
          >
            <Link href={item?.url!} target="_blank" className="underline">
              {item?.name}
            </Link>
            <Download className="w-5 h-5 text-purple-purp-aes" />
          </div>
        );
      })}
    </div>
  );
}

export default ProductDownloads;
