'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ProductQuantity from './ProductQuantity';
import { addToCart } from '@/app/actions/cart';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store/features/cart';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  id: string | number;
  name: string;
  currentPrice?: number;
  odoo_product_id?: string;
  model?: string;
  image?: string;
  isLoggedIn: boolean;
  inventory: number;
}

interface AddToCartFormData {
  id: string;
  title: string;
  price: number;
  odoo_product_id: string;
  model: string;
  image: string;
  quantity: string;
}
const AddToCartButton = ({
  id,
  name,
  currentPrice,
  odoo_product_id,
  model,
  image,
  isLoggedIn,
  inventory,
}: AddToCartButtonProps) => {
  const form = useForm<AddToCartFormData>();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: AddToCartFormData) => {
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }

    if (data.quantity === '') {
      toast({
        title: 'Quantity cannot be 0',
        variant: 'destructive',
      });
      return;
    }

    if (inventory <= 0) {
      toast({
        title: 'Out of Stock',
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    Array.from(formData.entries()).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const {
      success,
      error,
      message,
      data: cartData,
    } = await addToCart(formData);

    if (success) {
      toast({
        title: message,
        style: {
          backgroundColor: 'green',
          color: '#fff',
        },
        duration: 2000,
      });
      dispatch(
        setCart({
          id: data.id,
          name: data.title,
          price: data.price,
          quantity: Number(data.quantity),
          image: data.image,
          odoo_product_id: data.odoo_product_id,
          model: data.model,
        })
      );
    } else {
      toast({
        title: error,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ProductQuantity price={currentPrice} form={form} />
      <Input type="hidden" value={id || ''} {...form.register('id')} />
      <Input type="hidden" value={name || ''} {...form.register('title')} />
      <Input
        type="hidden"
        value={currentPrice || ''}
        {...form.register('price')}
      />
      <Input
        type="hidden"
        value={odoo_product_id || ''}
        {...form.register('odoo_product_id')}
      />
      <Input type="hidden" value={model || ''} {...form.register('model')} />
      <Input type="hidden" value={image || ''} {...form.register('image')} />
      <Button
        disabled={
          form.getValues('quantity') === '0' ||
          form.getValues('quantity') === null
        }
        type="submit"
        className="w-full mt-2 bg-[#1b1b3b] text-white"
      >
        Add to Cart
      </Button>
    </form>
  );
};

export default AddToCartButton;
