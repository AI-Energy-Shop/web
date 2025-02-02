export const formatCurrency = (value: number, currency: string) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getCartSubtotal = (cartItems: any[]) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
};


export const getCartItemSubtotal = (
  originalPrice: number,
  quantity: number
): string => {
  const subtotal = originalPrice * quantity;
  return subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getCartTotals = (
  cartItems: any[],
  shippingFee?: number,
  cardFee?: number
) => {
  const cartSubtotal = getCartSubtotal(cartItems);
  // Calculate GST for each component separately
  const cartGst = cartSubtotal * 0.10;
  const shippingGst = shippingFee ? shippingFee * 0.10 : 0;
  const cardGst = cardFee ? cardFee * 0.10 : 0;
  const subtotal = cartSubtotal;
  
  // Total GST is the sum of all GST components
  const totalGst = cartGst + shippingGst + cardGst;

  // Calculate final total including all fees and GST
  const total = cardFee
    ? cartSubtotal + shippingFee + cardFee + totalGst
    : cartSubtotal + shippingFee + totalGst;

  return {
    subtotal,
    totalGst,
    total,
  };
};
