import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import { Form, FormField } from '@/components/ui/form';
import ProductQuantity from '../product-quantity';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface FormInterface {
  form: UseFormReturn<AddToCartFormData>;
  handleSubmit: (onValid: AddToCartFormData) => void;
  handleError?: (
    onInvalid: FieldErrors<{ id: string; quantity: number }>
  ) => void;
  stock: number;
  isLoggedIn: boolean;
  hasValidPrice: boolean;
}

const CardForm = ({
  form,
  stock,
  isLoggedIn,
  hasValidPrice,
  handleSubmit,
  handleError,
}: FormInterface) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
        <div className="flex flex-col gap-2">
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => <Input type="hidden" {...field} />}
          />
          <ProductQuantity form={form} currentStock={stock} />
          <Button
            disabled={
              stock <= 0 ||
              !isLoggedIn ||
              !hasValidPrice ||
              form.formState.isSubmitting
            }
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              'Add to Cart'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CardForm;
