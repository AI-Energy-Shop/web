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
import { Input } from '@/components/ui/input';
interface ProductTableProps {
  products?: any;
}

const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const router = useRouter();
  const handleProductClick = async (product: any) => {
    router.push(`/admin/products/${product.documentId}`);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex justify-center items-center">
              <Input className="w-4 h-4" type="checkbox" />
            </TableHead>
            <TableHead></TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Vendor</TableHead>
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
