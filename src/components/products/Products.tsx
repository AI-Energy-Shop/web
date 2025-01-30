import React from 'react';
import ProductCard from './ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsProps {
  products: {
    documentId: string | number;
    images: {
      documentId: string | number;
      url: string;
      name: string;
    }[];
    name: string;
    model: string;
  }[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="flex-1">
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select defaultValue="alphabetical" >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical">Alphabetically, A-Z</SelectItem>
              <SelectItem value="price-low">Price, low to high</SelectItem>
              <SelectItem value="price-high">Price, high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-500 ml-4 flex items-center gap-2">
          <span>{products.length}</span>
          <span>products</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.documentId}
            image={product.images.find((_, index) => index === 0)?.url || ''}
            imageAlt={product.images.find((_, index) => index === 0)?.name || ''}
            name={`${product.name.slice(0, 45)}`}
            model="MODEL VALUE"
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
