export const getCartSubtotal = (cartItems: any[]) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
};

export const getCartTotal = (
  cartItems: any[],
  deliveryCharge: number,
  gst: number
) => {
  // Get the total price of all items in the cart including GST and delivery charge
  const subtotal = getCartSubtotal(cartItems);
  const subtotalWithGST = subtotal * gst; // 10% GST
  const total = subtotalWithGST + deliveryCharge;
  return total;
};
