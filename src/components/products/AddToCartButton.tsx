import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ProductQuantity from './ProductQuantity';
import { addToCart } from '@/app/actions/cart';

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
  return (
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
      <Button type="submit" className="w-full mt-2 bg-[#29294c] text-white">
        Add to Cart
      </Button>
    </form>
  );
};

export default AddToCartButton;
