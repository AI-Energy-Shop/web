'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ProductQuantity from './ProductQuantity';
import { useActionState } from 'react';
import { addToCart } from '@/app/actions/cart';
import { Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
  id: string | number;
  name: string;
  currentPrice?: number;
  odoo_product_id?: string;
  model?: string;
  image?: string;
}

const AddToCartButton = ({
  id,
  name,
  currentPrice,
  odoo_product_id,
  model,
  image,
}: AddToCartButtonProps) => {
  const [state, formAction, pending] = useActionState(addToCart, {
    message: '',
  });

  return (
    <form action={formAction}>
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
      <Button
        type="submit"
        disabled={pending}
        className="w-full mt-2 bg-[#29294c] text-white"
      >
        {pending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Add to Cart
      </Button>
    </form>
  );
};

export default AddToCartButton;
