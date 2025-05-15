'use client';

import React from 'react';
import { TableCell, TableRow, TableHead } from '@/components/ui/table';
import { ProductQuery } from '@/lib/gql/graphql';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { getProductStatus } from '@/utils/product';

interface ProductProps {
  product: ProductQuery['product'];
  selectedProducts: string[];
  onClick: (product: any) => void;
  onInputChange: (id: string) => void;
}

const Product: React.FC<ProductProps> = ({
  product,
  selectedProducts,
  onClick,
  onInputChange,
}) => {
  const statusInfo = getProductStatus(product?.releasedAt);
  const firstImage = product?.images.at(0);
  const defatultImage = '/no-product-image.jpg';

  return (
    <TableRow key={product?.documentId} className="h-9 cursor-pointer">
      <TableCell className="w-[68px] text-center align-middle">
        <Input
          className="w-4 h-4"
          type="checkbox"
          checked={selectedProducts.includes(product?.documentId || '')}
          onChange={() => onInputChange(`${product?.documentId}`)}
        />
      </TableCell>
      <TableCell
        onClick={() => onClick(product)}
        className="w-[60px] h-[50px] text-center align-middle"
      >
        <Image
          width={50}
          height={50}
          priority
          alt={firstImage?.alternativeText || ''}
          className="object-contain w-full h-full"
          src={firstImage?.url || defatultImage || ''}
        />
      </TableCell>
      <TableCell
        onClick={() => onClick(product)}
        className="w-[350px] align-middle"
      >
        {product?.name}
      </TableCell>
      <TableCell
        onClick={() => onClick(product)}
        className="w-[120px] text-center align-middle"
      >
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}
        >
          {statusInfo.status}
        </span>
      </TableCell>
      <TableCell
        onClick={() => onClick(product)}
        className="w-[180px] align-middle"
      >
        {product?.product_type}
      </TableCell>
    </TableRow>
  );
};

export default Product;
