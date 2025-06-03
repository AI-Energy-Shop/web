import { GetStoreProductQuery } from '@/lib/gql/graphql';
import React from 'react';

interface CardDetailsProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const CardDetails = ({ product }: CardDetailsProps) => {
  return (
    <div className="flex flex-col justify-between">
      <h3
        className="font-medium text-sm mb-1 text-pretty"
        title={product?.name}
      >
        <span>{product?.name.slice(0, 40)} . . .</span>
      </h3>
      <p className="h-[20px] text-sm font-thin italic">{product?.model}</p>
    </div>
  );
};

export default CardDetails;
