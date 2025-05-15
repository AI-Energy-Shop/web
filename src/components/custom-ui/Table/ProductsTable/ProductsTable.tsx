'use client';
import React, { Suspense, useState } from 'react';
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
import { ProductsQuery } from '@/lib/gql/graphql';

interface ProductTableProps {
  products: ProductsQuery['products'];
}

const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductClick = async (product: any) => {
    router.push(`/admin/products/${product.documentId}`);
  };

  const onInputChange = (documentId: string) => {
    products.map((product) => {
      if (product?.documentId === documentId) {
        setSelectedProducts((prev) => [...prev, product?.documentId]);
      }
    });
  };

  const handleSelectAllChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target.checked) {
      setSelectedProducts(products.map((product) => product?.documentId || ''));
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        className="relative w-full"
        style={{ height: 'calc(100vh - 120px)' }}
      >
        <div className="h-full overflow-y-auto">
          <Table className="w-full table-fixed">
            <TableHeader className=" bg-gray-200">
              <TableRow className="cursor-pointer">
                <TableHead className="w-0 text-center bg-gray-200">
                  <Input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={handleSelectAllChange}
                  />
                </TableHead>
                <TableHead className="w-[60px] bg-gray-200 text-center">
                  Image
                </TableHead>
                <TableHead className="w-[350px] bg-gray-200">Product</TableHead>
                <TableHead className="w-[120px] bg-gray-200 text-center">
                  Status
                </TableHead>
                <TableHead className="w-[180px] bg-gray-200">
                  Category
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!products ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    NO AVAILABLE DATA
                  </TableCell>
                </TableRow>
              ) : (
                products?.map?.((product: any) => (
                  <Product
                    key={product.documentId}
                    product={product}
                    onClick={handleProductClick}
                    onInputChange={onInputChange}
                    selectedProducts={selectedProducts}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
};

export default ProductsTable;
