'use client';
import React from 'react';
import CartItem from './CartItem';

const CartItems = ({ data }: { data: any[] }) => {
  const [cartData, setCartData] = React.useState(data.slice());

  const handleAddItemQuantity = (id: string) => {
    console.log('add');
    setCartData((prevCartData) => {
      return prevCartData.map((item) => {
        if (item.documentId === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  };

  const handleReduceItemQuantity = (id: string) => {
    console.log('remove');
    setCartData((prevCartData) => {
      return prevCartData.map((item) => {
        if (item.documentId === id) {
          return {
            ...item,
            quantity: item.quantity !== 0 ? item.quantity - 1 : 0,
          };
        }
        return item;
      });
    });
  };

  const handleOnInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value || isNaN(parseInt(e.target.value, 10))) return;

    setCartData((prevCartData) => {
      const newCartData = [...prevCartData];
      const itemIndex = newCartData.findIndex((item) => item.id === id);

      if (itemIndex === -1) return newCartData;

      const item = newCartData[itemIndex];
      const quantity = parseInt(e.target.value, 10);

      if (quantity < 0) return newCartData;

      newCartData[itemIndex] = {
        ...item,
        quantity,
      };

      return newCartData;
    });
  };

  return (
    <div className="space-y-8 pt-8 md:pr-12">
      {cartData?.map?.((item) => {
        return (
          <CartItem
            key={item.documentId}
            id={item.documentId}
            image={item.image}
            title={item.title}
            refId={item.reference_id}
            price={item.price}
            quantity={item.quantity}
            currency="$"
            onAddQuant={handleAddItemQuantity}
            onReduceQuant={handleReduceItemQuantity}
            onChange={handleOnInputChange}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
