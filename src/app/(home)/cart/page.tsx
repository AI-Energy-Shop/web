import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartItemType } from '@/lib/types';
import React from 'react';

const initialItems: CartItemType[] = [
  {
    id: '1',
    name: 'Solar Panel',
    referenceId: 'ODOO-02',
    price: 455.24,
    quantity: 1,
    image: '/solar-panel.jpg',
  },
  {
    id: '2',
    name: 'Ultra super fast Solar Panel',
    referenceId: 'ODOO-02',
    price: 299.99,
    quantity: 2,
    image: '/solar-panel.jpg',
  },
];

const CartPage = () => {
  //   const [items, setItems] = useState<CartItemType[]>(initialItems);

  //   const updateQuantity = (id: string, quantity: number) => {
  //     setItems(items.map(item =>
  //       item.id === id ? { ...item, quantity } : item
  //     ));
  //   };

  //   const removeItem = (id: string) => {
  //     setItems(items.filter(item => item.id !== id));
  //   };

  const calculateSubtotal = () => {
    return initialItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  //   const handleCheckout = () => {
  //     // Implement checkout logic
  //     console.log('Proceeding to checkout...');
  //   };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 max-w-screen-lg m-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {initialItems.length > 0 ? (
                initialItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    // onUpdateQuantity={updateQuantity}
                    // onRemove={removeItem}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              //   onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
