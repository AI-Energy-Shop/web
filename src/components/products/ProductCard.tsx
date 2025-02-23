import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductQuantity from './ProductQuantity';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { addToCart } from '@/app/actions/cart';
import { formatCurrency } from '@/utils/currency';

interface ProductCardProps {
  id: string | number;
  category: string;
  image: string;
  imageAlt: string;
  name: string;
  model: string;
  odoo_product_id: string;
  price?: {
    user_level: string;
    price: number;
    sale_price: number;
  };
  inventory?: {
    location: string;
    quantity: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  category,
  image,
  imageAlt,
  name,
  model,
  odoo_product_id,
  price,
  inventory,
}) => {
  const salePrice = price?.sale_price || 0;
  const currentPrice = price?.sale_price ? price?.sale_price : price?.price;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link
        href={`/products/${category?.toLowerCase()?.replaceAll(' ', '-')}/${id}`}
      >
        <div className="flex flex-col gap-2">
          {/* IMAGE */}
          <div className="aspect-[3/4] relative bg-[#e6e6e6]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
            />
          </div>
          {/* NAME AND MODEL */}
          <div className="flex flex-col justify-between">
            <h3 className="font-medium text-sm mb-1 text-pretty">
              <span>{name}</span>
            </h3>
            <p className="text-sm font-thin italic">{model}</p>
          </div>
          {/* PRICE AND STOCK */}
          <div className="grid grid-cols-1 grid-rows-3">
            <span className="text-sm text-gray-400 line-through row-span-1">
              {salePrice ? formatCurrency(price?.price, 'AUD') : null}
            </span>
            <p className="text-md font-bold row-span-1 block h-auto">
              {formatCurrency(currentPrice, 'AUD')}{' '}
              <span className="text-xs font-normal">ex.GST</span>
            </p>
            <span className="text-sm text-green-900 row-span-1">
              In Stock ({inventory?.quantity})
            </span>
          </div>
        </div>
      </Link>
      <form action={addToCart}>
        <ProductQuantity price={currentPrice} />
        <Input type="hidden" value={id || ''} name="id" />
        <Input type="hidden" value={name || ''} name="title" />
        <Input type="hidden" value={currentPrice || ''} name="price" />
        <Input
          type="hidden"
          value={odoo_product_id || ''}
          name="odoo_product_id"
        />
        <Input type="hidden" value={model || ''} name="model" />
        <Input type="hidden" value={image || ''} name="image" />
        <Button className="w-full mt-2 bg-[#29294c] text-white" type="submit">
          Add to Cart
        </Button>
      </form>
    </div>
  );
};

export default ProductCard;
