'use client';
import { formatCurrency } from '@/utils/currency';
import { ProductsQuery } from '@/lib/gql/graphql';
import useMe from '@/hooks/useMe';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';
import useCart from '@/hooks/useCart';
import { Form, FormField } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import ProductQuantity from './ProductQuantity';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

type ProductCardproduct = {
  product?: ProductsQuery['products'][0] | null;
};

const addToCartFormSchema = z.object({
  id: z.string(),
  quantity: z.number().min(0), // Make sure this is number
});

const ProductCard: React.FC<ProductCardproduct> = ({ product }) => {
  const { carts, warehouse, addToCart, updateCartItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useMe();

  const stocks =
    product?.inventories.find(
      (inventory) => inventory?.name === warehouse?.address.city
    )?.quantity || 0;

  const itemPrice = product?.price_lists?.find(
    (price) => price?.user_level === user?.account_detail?.level
  );

  const salePrice = itemPrice?.sale_price;
  const regularPrice = itemPrice?.price;

  // More explicit price calculation
  const productPrice = salePrice || regularPrice || 0;

  const form = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      id: product?.documentId || '',
      quantity: 0,
    },
  });

  const productLink = `/products/${product?.category?.slug}/${product?.documentId}`;

  const onSubmit = async (data: z.infer<typeof addToCartFormSchema>) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (data.quantity === 0 || data.quantity === null) {
      toast({
        title: 'Quantity cannot be 0',
        variant: 'destructive',
      });
      return;
    }

    if (stocks <= 0) {
      toast({
        title: 'Out of Stock',
        variant: 'destructive',
      });
      return;
    }

    const cartItem = carts.find(
      (cart) => cart?.product?.documentId === data.id
    );

    if (cartItem && cartItem?.product) {
      updateCartItem({
        cartId: cartItem.documentId,
        product: cartItem.product.documentId,
        quantity: cartItem.quantity + data.quantity,
      });
      return;
    }

    await addToCart({
      product: data.id,
      quantity: data.quantity,
      user: user?.id,
    });
  };

  const renderPriceAndStock = () => {
    if (!user) {
      return (
        <div className="grid grid-cols-1 my-3">
          <span className="text-sm row-span-1 text-[#1b1b3b]">
            Login to view price
          </span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 grid-rows-3">
        <span className="text-sm text-gray-400 line-through row-span-1">
          {itemPrice?.price ? formatCurrency(itemPrice.price, 'USD') : null}
        </span>
        <p className="text-md font-bold row-span-1 block h-auto">
          {formatCurrency(productPrice || 0, 'USD')}{' '}
          <span className="text-xs font-normal">ex.GST</span>
        </p>
        <span
          className={cn(
            `${stocks > 0 ? 'text-green-900' : 'text-red-900'} text-sm  row-span-1`
          )}
        >
          {stocks > 0 ? (
            <span className="text-green-900">In Stock ({stocks})</span>
          ) : (
            <span className="text-red-900">Out of Stock</span>
          )}
        </span>
      </div>
    );
  };

  const renderHiddenInput = (
    name: keyof z.infer<typeof addToCartFormSchema>
  ) => {
    return (
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => <Input type="hidden" {...field} />}
      />
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={productLink}>
        <div className="flex flex-col gap-2">
          {/* IMAGE */}
          <div className="aspect-[3/4] relative bg-[#e6e6e6]">
            <Image
              src={product?.images[0]?.url || ''}
              alt={product?.images[0]?.name || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
            />
          </div>
          {/* NAME AND MODEL */}
          <div className="flex flex-col justify-between">
            <h3
              className="font-medium text-sm mb-1 text-pretty"
              title={product?.name}
            >
              <span>{product?.name.slice(0, 40)} . . .</span>
            </h3>
            <p className="text-sm font-thin italic">{product?.model}</p>
          </div>
          {renderPriceAndStock()}
        </div>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderHiddenInput('id')}
          {user && (
            <>
              <ProductQuantity form={form} />
              <Button
                type="submit"
                disabled={stocks <= 0}
                className="w-full mt-2 bg-[#1b1b3b] text-white"
              >
                {stocks <= 0 ? 'Out of Stock' : `Add to Cart`}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProductCard;
