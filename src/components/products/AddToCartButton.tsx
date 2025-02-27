'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ProductQuantity from './ProductQuantity';
import { addToCart } from '@/app/actions/cart';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';


interface AddToCartButtonProps {
  id: string | number;
  name: string;
  currentPrice?: number;
  odoo_product_id?: string;
  model?: string;
  image?: string;
}

interface AddToCartFormData {
  id: string;
  title: string;
  price: number;
  odoo_product_id: string;
  model: string;
  image: string;
}
const AddToCartButton = ({
  id,
  name,
  currentPrice,
  odoo_product_id,
  model,
  image,
}: AddToCartButtonProps) => {
  const form = useForm<AddToCartFormData>();
  const { toast } = useToast();
  const onSubmit = async (data: AddToCartFormData) => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('odoo_product_id', data.odoo_product_id);
    formData.append('model', data.model);
    formData.append('image', data.image);

    const { success, error, message } = await addToCart(formData);
    if (success) {
      toast({
        title: message,
        style: {
          backgroundColor: 'green',
          color: '#fff',
        },
        duration: 2000,
      });
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
      <Button type="submit" className="w-full mt-2 bg-[#1b1b3b] text-white">
        Add to Cart
      </Button>
    </form>
  );
};

export default AddToCartButton;
