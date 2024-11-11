'use client';
import React, { Suspense } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import Product from './Product';

interface ProductTableProps {
  products?: any;
}

const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const router = useRouter();
  const handleProductClick = async (product: any) => {
    router.push(`/admin/dashboard/products/${product.documentId}`);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!products ? (
            <TableRow className="p-5">
              <TableCell>NO AVAILABLE DATA</TableCell>
            </TableRow>
          ) : (
            products?.map?.((product: any) => (
              <Product
                key={product.documentId}
                product={product}
                onClick={handleProductClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </Suspense>
  );
};

export default ProductsTable;
