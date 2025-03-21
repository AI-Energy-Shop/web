'use client';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Form, FormField } from '../ui/form';
import { setCart } from '@/store/features/cart';
import ProductQuantity from './ProductQuantity';
import { zodResolver } from '@hookform/resolvers/zod';
import useMe from '@/hooks/useMe';

const addToCartFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  model: z.string(),
  image: z.string(),
  odoo_product_id: z.string(),
  price: z.number(), // Make sure this is number, not string
  quantity: z.number().min(0), // Make sure this is number
});

interface CardAddToCartButtonProps {
  id: string;
  image: string;
  title: string;
  model: string;
  odoo_product_id: string;
  stocks: number;
  productPrice: number;
}
const CardAddToCartButton = ({
  id,
  image,
  title,
  model,
  odoo_product_id,
  stocks,
  productPrice,
}: CardAddToCartButtonProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { me } = useMe();

  const form = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      id,
      title,
      model,
      image,
      odoo_product_id,
      price: Number(productPrice),
      quantity: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof addToCartFormSchema>) => {};

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

  const isDisabled = stocks <= 0;

  return (
    <Form {...form}>
      {/* <form action={testAddToCart}> */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {renderHiddenInput('id')}
        {renderHiddenInput('image')}
        {renderHiddenInput('title')}
        {renderHiddenInput('model')}
        {renderHiddenInput('price')}
        {renderHiddenInput('odoo_product_id')}
        <ProductQuantity form={form} />
        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full mt-2 bg-[#1b1b3b] text-white"
        >
          {stocks <= 0 ? 'Out of Stock' : `Add to Cart`}
        </Button>
      </form>
    </Form>
  );
};

export default CardAddToCartButton;
