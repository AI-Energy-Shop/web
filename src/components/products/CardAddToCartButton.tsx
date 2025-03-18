'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ProductQuantity from './ProductQuantity';
import { addToCart, testAddToCart } from '@/app/actions/cart';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store/features/cart';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useMe from '@/hooks/useMe';
import { Form, FormField } from '../ui/form';
import { ProductQuery } from '@/lib/gql/graphql';
import useCart from '@/hooks/useCart';

const addToCartFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  model: z.string(),
  image: z.string(),
  odoo_product_id: z.string(),
  price: z.string(), // Make sure this is number, not string
  quantity: z.number().min(0), // Make sure this is number
});

interface CardAddToCartButtonProps {
  product: ProductQuery['product'];
  // id: string;
  // image: string;
  // title: string;
  // model: string;
  // odoo_product_id: string;
  // stocks: number;
  // price: number;
}
const CardAddToCartButton = ({
  // id,
  // image,
  // title,
  // model,
  // odoo_product_id,
  // stocks,
  // price,
  product,
}: CardAddToCartButtonProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { me } = useMe();
  const { warehouse } = useCart();

  const inventory = product?.inventories.find(
    (inventory) => inventory?.name === warehouse?.address.city
  );

  const stocks = inventory?.quantity || 0;

  const itemPrice = product?.price_lists?.find(
    (price) => price?.user_level === me?.account_detail?.level
  );

  const salePrice = itemPrice?.sale_price || 0;
  const regularPrice = itemPrice?.price || 0;
  const productPrice = salePrice ? salePrice : regularPrice;

  console.log('productPrice:', productPrice);

  const form = useForm<z.infer<typeof addToCartFormSchema>>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      id: product?.documentId || '',
      title: product?.name || '',
      model: product?.model || '',
      image: product?.images[0]?.url || '',
      odoo_product_id: product?.odoo_product_id || '',
      price: productPrice.toString(),
      quantity: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof addToCartFormSchema>) => {
    console.log('data:', data);
    // if (!me) {
    //   router.push('/auth/login');
    //   return;
    // }

    // if (data.quantity === 0 || data.quantity === null) {
    //   toast({
    //     title: 'Quantity cannot be 0',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    // if (stocks <= 0) {
    //   toast({
    //     title: 'Out of Stock',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    // const formData = new FormData();
    // Object.entries({ ...data, price: price }).forEach(([key, value]) => {
    //   formData.append(key, value as string);
    // });
    // const { error, data: cartData } = await addToCart(formData);
    // console.log('cartData:', cartData);
    // if (error) {
    //   toast({
    //     title: error,
    //     variant: 'destructive',
    //   });
    //   return;
    // }
    // toast({
    //   title: `${data.title} added to cart`,
    //   description: 'Your cart has been updated',
    //   style: {
    //     backgroundColor: 'green',
    //     color: '#fff',
    //   },
    //   duration: 5000,
    // });
    // dispatch(
    //   setCart({
    //     id: cartData?.id || '',
    //     name: cartData?.name || '',
    //     price: cartData?.price || 0,
    //     quantity: Number(cartData?.quantity) || 0,
    //     image: cartData?.image || '',
    //     odoo_product_id: cartData?.odoo_product_id || '',
    //     model: cartData?.model || '',
    //   })
    // );
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

  const isDisabled = stocks <= 0;

  if (Object.entries(form.formState.errors).length > 0) {
    console.log(form.formState.errors);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <form action={testAddToCart}> */}
        {renderHiddenInput('id')}
        {renderHiddenInput('image')}
        {renderHiddenInput('title')}
        {renderHiddenInput('model')}
        {renderHiddenInput('price')}
        {renderHiddenInput('odoo_product_id')}
        <ProductQuantity form={form} />
        <Button
          // type="button"
          type="submit"
          // onClick={() => {
          //   console.log('props:', {
          //     id,
          //     image,
          //     title,
          //     model,
          //     odoo_product_id,
          //     price,
          //     quantity: 0,
          //   });
          //   console.log('defaultValues:', form.formState.defaultValues);
          // }}
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
