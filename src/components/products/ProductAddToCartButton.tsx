'use client';
import { z } from 'zod';
import React from 'react';
import useMe from '@/hooks/useMe';
import { Input } from '../ui/input';
import { firaSans } from '@/app/font';
import useCart from '@/hooks/useCart';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { ProductQuery } from '@/lib/gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { addToCartFormSchema } from '@/lib/validation-schema/add-to-cart-form';

interface ProductAddToCartButtonProps {
  product: ProductQuery['product'];
}

const ProductAddToCartButton = ({ product }: ProductAddToCartButtonProps) => {
  const { me } = useMe();
  const { toast } = useToast();
  const { carts, warehouse, addToCart, updateCartItem } = useCart();

  const priceList = product?.price_lists?.map((price) => ({
    documentId: price?.documentId,
    price: price?.price ?? undefined,
    sale_price: price?.sale_price ?? undefined,
    user_level: price?.user_level ?? undefined,
    // min_quantity: price?.min_quantity ?? undefined,
    // max_quantity: price?.max_quantity ?? undefined,
  }));
  const itemPrice = priceList?.find(
    (price) => price?.user_level === me?.account_detail?.level
  );

  const salePrice = itemPrice?.sale_price;
  const regularPrice = itemPrice?.price;

  const productPrice = salePrice ? salePrice : regularPrice || 0;

  const stocks = product?.inventories.find(
    (inventory) => inventory?.name === warehouse?.address.city
  );

  const form = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      id: product?.documentId,
      quantity: 0,
      price: productPrice,
      title: product?.name ?? undefined,
      model: product?.model ?? undefined,
      image: product?.images?.[0]?.url ?? undefined,
      odoo_product_id: product?.odoo_product_id ?? undefined,
    },
  });

  const handleIncrement = () => {
    const quantity = form.getValues('quantity');
    const price = form.getValues('price');
    const totalItemPrice = price + productPrice;
    form.setValue('quantity', quantity + 1);
    form.setValue('price', totalItemPrice);
  };

  const handleDecrement = () => {
    const quantity = form.getValues('quantity');
    const price = form.getValues('price');

    if (quantity > 0) {
      form.setValue('quantity', quantity - 1);
      form.setValue('price', price - productPrice);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const price = form.getValues('price');
    if (!isNaN(value)) {
      form.setValue('quantity', value);
      form.setValue('price', value * price);
    }
  };

  const onSubmit = async (onValid: z.infer<typeof addToCartFormSchema>) => {
    const stockQuantity = stocks?.quantity || 0;

    if (stockQuantity <= 0) {
      toast({
        title: 'Out of Stock',
        variant: 'destructive',
      });
      return;
    }
    if (onValid.quantity <= 0) {
      toast({
        title: 'Quantity cannot be 0',
        variant: 'destructive',
      });
      return;
    }

    const cartItem = carts.find((cart) => cart.item.productID === onValid?.id);

    if (cartItem) {
      updateCartItem({
        variables: {
          documentId: cartItem.documentId,
          data: {
            item: {
              productID: cartItem.item.productID,
              title: cartItem.item.name,
              model: cartItem.item.model,
              image: cartItem.item.image,
              price: cartItem.item.price + onValid.price,
              quantity: cartItem.item.quantity + onValid.quantity,
              odoo_product_id: cartItem.item.odoo_product_id,
            },
          },
        },
      });
      return;
    }

    addToCart({
      variables: {
        data: {
          item: {
            productID: onValid.id,
            title: onValid.title,
            model: onValid.model,
            image: onValid.image,
            price: onValid.price,
            quantity: onValid.quantity,
            odoo_product_id: onValid.odoo_product_id,
          },
          user: me?.id,
        },
      },
    });
  };

  const renderHiddenInput = ({
    name,
  }: {
    name: keyof z.infer<typeof addToCartFormSchema>;
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  if (!me) {
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <span className="text-sm row-span-1 text-[#1b1b3b]">
          Login to view price
        </span>
      </div>
    );
  }

  return (
    <div className="bg-yellow-light-yellow max-md:px-4 md:bg-white md:mt-6">
      <div className="mx-auto">
        {/* <PickupLocation product={product} pickLocation={pickLocation} /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderHiddenInput({ name: 'id' })}
            {renderHiddenInput({ name: 'image' })}
            {renderHiddenInput({ name: 'title' })}
            {renderHiddenInput({ name: 'model' })}
            {renderHiddenInput({ name: 'price' })}
            {renderHiddenInput({ name: 'odoo_product_id' })}
            <div className="mx-auto text-center max-md:px-2 md:mt-6 md:py-2 md:flex md:justify-between">
              <div className="flex flex-col border rounded-lg overflow-hidden">
                <div className="flex items-center border-b gap-0">
                  <div className="h-8 w-12 text-sm font-medium flex items-center justify-center bg-gray-500 m-0">
                    QTY
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleDecrement}
                    // disabled={disabled || quantity >= maxQuantity}
                    className="cursor-pointer h-8 w-8 border-l rounded-none bg-gray-300"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={handleInputChange}
                            className="h-8 w-20 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleIncrement}
                    className="cursor-pointer h-8 w-8 border-l rounded-none bg-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-lg font-semibold">
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {Number(form.watch('price')).toFixed(2)} ex. GST
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!stocks?.quantity || stocks?.quantity == 0}
                className={`${firaSans.className} max-md:mt-3 max-md:mb-5 w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold md:basis-[57.98%] text-[20px] md:text-[28px] md:rounded-lg md:h-16`}
              >
                {stocks?.quantity || (stocks?.quantity && stocks?.quantity > 0)
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductAddToCartButton;
