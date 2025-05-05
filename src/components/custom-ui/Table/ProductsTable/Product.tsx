'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { ProductQuery } from '@/lib/gql/graphql';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { getProductStatus } from '@/utils/product';

interface ProductProps {
  product: ProductQuery['product'];
  onClick: (product: any) => void;
}

const Product: React.FC<ProductProps> = ({ product, onClick }) => {
  const statusInfo = getProductStatus(product?.releasedAt);

  const firstImage = product?.images.at(0);
  const defatultImage = process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_IMAGE;

  return (
    <TableRow
      key={product?.documentId}
      onClick={() => onClick(product)}
      className="cursor-pointer p-1 overflow-hidden"
    >
      <TableCell className="flex justify-center items-center">
        <Input className="w-4 h-4" type="checkbox" />
      </TableCell>
      <TableCell className="w-[50px] h-[50px] border overflow-hidden">
        <Image
          width={50}
          height={50}
          alt={firstImage?.alternativeText || ''}
          src={firstImage?.url || defatultImage || ''}
          className="object-contain w-full h-full"
        />
      </TableCell>
      <TableCell>{product?.name}</TableCell>
      <TableCell>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}
        >
          {statusInfo.status}
        </span>
      </TableCell>
      <TableCell>{product?.product_type}</TableCell>
      <TableCell>{product?.vendor}</TableCell>
    </TableRow>
  );
};

export default Product;
