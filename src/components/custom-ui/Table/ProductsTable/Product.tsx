'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface ProductProps {
  product: any;
  onClick: (product: any) => void;
}

const Product: React.FC<ProductProps> = ({ product, onClick }) => {
  return (
    <TableRow
      key={product.documentId}
      onClick={() => onClick(product)}
      className="cursor-pointer"
    >
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>On stock</TableCell>
      <TableCell>{product.vendor}</TableCell>
      <TableCell>{product.createdAt}</TableCell>
      <TableCell>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product.status === 'In Stock'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.status}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Product;
