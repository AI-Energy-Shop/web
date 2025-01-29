export const formatCurrency = (value: number, currency: string) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export const getCartSubtotal = (cartItems: any[]) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
};

export const getCartTotalGST = (cartItems: any[]) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.gst;
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
    maximumFractionDigits: 2
  });
};


export const getCartTotals = (cartItems: any[], shippingFee?: number, cardFee?: number) => {
  const totalItemsGST = getCartTotalGST(cartItems);
  const subtotal = getCartSubtotal(cartItems);

  const shippingGst = shippingFee ? shippingFee : 0;
  
  let totalGst, total: number = 0;
  
  if (cardFee) {
    const cardfeeGst = cardFee ? cardFee * 0.12 : 0; 
    totalGst = totalItemsGST + shippingGst + cardfeeGst;
  } else {
    totalGst = totalItemsGST + shippingGst;
  }
  
  if (cardFee) {
    total = subtotal + shippingFee + totalGst + cardFee;
  } else {
    total = subtotal + shippingFee + totalGst;
  }

  return {
    subtotal,
    totalGst,
    total
  };
};
