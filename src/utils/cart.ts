import { CartType } from '@/lib/types'; 

export const formatCurrency = (value?: number, currency?: string) => {
  if (!value) return '0.00';
  return value?.toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getCartSubtotal = (cartItems: CartType[]) => {
  return cartItems.reduce((acc, item) => {
    const quantity = item?.item?.quantity ?? 0;
    const price = item?.item?.price ?? 0;
    return acc + quantity * price;
  }, 0);
};

export const getCartItemSubtotal = (
  originalPrice?: number,
  quantity?: number
): string => {
  if (!originalPrice || !quantity) return '0.00';
  const subtotal = originalPrice * quantity;

  return subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getCartTotals = (
  cartItems: CartType[],
  shippingFee?: number,
  cardFee?: number
) => {
  const cartSubtotal = getCartSubtotal(cartItems);
  // Calculate GST for each component separately
  const cartGst = cartSubtotal * 0.1;
  const shippingGst = shippingFee ? shippingFee * 0.1 : 0;
  const cardGst = cardFee ? cardFee * 0.1 : 0;
  const subtotal = cartSubtotal;

  // Total GST is the sum of all GST components
  const totalGst = cartGst + shippingGst + cardGst;

  // Calculate final total including all fees and GST
  const total = cardFee
    ? cartSubtotal + (shippingFee ?? 0) + cardFee + totalGst
    : cartSubtotal + (shippingFee ?? 0) + totalGst;

  return {
    subtotal,
    totalGst,
    total,
  };
};
