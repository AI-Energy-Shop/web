'use client';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Form, FormField } from '../ui/form';
import ProductQuantity from './ProductQuantity';
import { zodResolver } from '@hookform/resolvers/zod';
import useMe from '@/hooks/useMe';

const addToCartFormSchema = z.object({
  id: z.string(),
  quantity: z.number().min(0), // Make sure this is number
});

interface CardAddToCartButtonProps {
  id: string;
  stocks: number;
}
const CardAddToCartButton = ({ id, stocks }: CardAddToCartButtonProps) => {
  const form = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      id,
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {renderHiddenInput('id')}
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
