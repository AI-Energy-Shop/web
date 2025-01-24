'use client';
import React from 'react';
import CheckoutHeader from '@/components/Checkout/CheckoutHeader';
import ReviewItems from './ReviewItems';
import ShippingDetails from './ShippingDetails';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { getCartSubtotal, getCartTotal } from '@/utils/cart';
import { useMutation, useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import USER_OPERATIONS from '@/graphql/users';
import ORDER_OPERATIONS from '@/graphql/order';
import { DELIVERY_OPTIONS, SHIPPING_DETAILS } from '@/constant/shipping';

// type UserData = {
//   __typename?: "UsersPermissionsUser";
//   documentId: string;
//   email: string;
//   account_status?: Enum_Userspermissionsuser_Account_Status | null;
//   blocked?: boolean | null;
//   username: string;
//   account_detail?: {
//     __typename?: "AccountDetail";
//     firstName: string;
//     lastName: string;
//   } | null;
// } | undefined;

type ShippingDetails = {
  deliveryMethod: string;
  shippingAddresses: {
    street: string;
    suburb: string;
    state_territory: string;
    postcode: string;
    country: string;
  }[];
  deliveryOptions: {
    courer: string;
    price: number;
  }[];
  tbcDate: Date;
};

interface CartDetailsProps {
  authToken?: any;
  userEmail?: string;
}
const CartDetails: React.FC<CartDetailsProps> = ({ authToken, userEmail }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [stepper, setStepper] = React.useState<number>(1);
  const [cartData, setCartData] = React.useState<any[]>([]);

  const [warehouseLocation, setWarehouseLocation] = React.useState<any[]>([
    {
      id: 0,
      title: 'Sydney(24/32-38 Belmore Rd, Punchbowl NSW)',
    },
    {
      id: 1,
      title: 'Melbourne(34/49 McArthurs Rd, Altona North VIC 3025)',
    },
    {
      id: 2,
      title: 'Brisbane(4/22 Spine St, Sumner QLD 4074)',
    },
  ]);

  const [shipping, setShipping] = React.useState<any>({
    deliveryOptions: {
      title: 'TNT Standard Shipping',
      price: 39.0,
      eta: '3-5',
      notes: ""
    },
    shippingOptions: {
      company_name: 'Fake Company Installs',
      address: {
        street: '123 Example Street',
        suburb: 'Sydney',
        state_territory: 'NSW',
        postcode: '2000',
        country: 'Australia',
      },
    },
  });

  useQuery(USER_OPERATIONS.Queries.user, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
      if (!data?.user) return;
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
    variables: {
      filters: {
        email: userEmail,
      },
    },
  });

  useQuery(CART_OPERATIONS.Query.cartItems, {
    onCompleted: (data) => {
      if (!data?.carts) return;
      setCartData(data?.carts);
    },
  });

  const [createOrder] = useMutation(ORDER_OPERATIONS.Mutation.createOrder, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
  });

  const handleIncrementStepper = () => {
    try {
      setStepper((prev) => {
        if (prev == null) throw new Error('Stepper value is null');

        if (prev === 3) {
          console.log('submit');
          createOrder({
            variables: {
              data: {
                cart_items: cartData.map((item) => ({
                  title: item.title,
                  quantity: item.quantity,
                  price: item.price,
                  odoo_product_id: item.odoo_product_id,
                })),
                shipping: {
                  delivery_address: null,
                  delivery_option: shipping.deliveryOptions,
                  shipping_details: shipping.shippingOptions
                },
              },
            },
          });
          return 3;
        }
        return Math.min(prev + 1, 3);
      });
    } catch (error) {
      console.error('Error in handleIncrementStepper:', error);
    }
  };

  const handleAddItemQuantity = (id: string) => {
    if (!cartData.length) return;

    setCartData((prevCartData) => {
      const newCartData = [...prevCartData];
      const itemIndex = newCartData.findIndex(
        (item) => item?.documentId === id
      );
      if (itemIndex === -1) return newCartData;

      const item = newCartData[itemIndex];
      if (!item) return newCartData;

      newCartData[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
        price: item.price * (item.quantity + 1),
      };

      return newCartData;
    });
  };

  const handleReduceItemQuantity = (id: string) => {
    if (!cartData.length) return;

    setCartData((prevCartData) => {
      const itemIndex = prevCartData.findIndex(
        (item) => item?.documentId === id
      );
      if (itemIndex === -1) return prevCartData;

      const item = prevCartData[itemIndex];
      if (!item || item.quantity < 2) {
        return prevCartData.filter((cartItem) => cartItem?.documentId !== id);
      }

      const { price, quantity } = item;
      const newPrice = (price * (quantity - 1)) / quantity;

      return prevCartData.map((cartItem, index) =>
        index === itemIndex
          ? { ...cartItem, quantity: quantity - 1, price: newPrice }
          : cartItem
      );
    });
  };

  const handleOnInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!value || isNaN(parseInt(value, 10))) return;

    if (!cartData.length) return;

    setCartData((prevCartData) => {
      const newCartData = [...prevCartData];
      const itemIndex = newCartData.findIndex((item) => item?.id === id);
      if (itemIndex === -1) return newCartData;

      const item = newCartData[itemIndex];
      if (!item) return newCartData;

      const quantity = parseInt(value, 10);
      if (quantity < 0) return newCartData;

      newCartData[itemIndex] = {
        ...item,
        quantity,
      };

      return newCartData;
    });
  };

  const handleEditClick = (index: number) => {
    setStepper(index);
  };

  const handleChangeWarehouse = (id: any) => {
    console.log(id);
  };

  const handleDeliveryChange = (id: any) => {
    setShipping((prev: any) => ({
      ...prev,
      deliveryOptions: DELIVERY_OPTIONS.find((option) => option.id === id),
    }));
  };

  return (
    <>
      <CheckoutHeader stepper={stepper} />
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4">
        Checkout
      </h1>

      <div className="md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          <ReviewItems
            warehouseLocation={warehouseLocation}
            onChangeWarehouse={handleChangeWarehouse}
            cartItems={cartData}
            stepper={stepper}
            onEdit={handleEditClick}
            onChange={handleOnInputChange}
            onAddQuant={handleAddItemQuantity}
            onReduceQuant={handleReduceItemQuantity}
            onClickContinue={handleIncrementStepper}
          />

          <ShippingDetails
            date={date}
            stepper={stepper}
            shippingAddresses={SHIPPING_DETAILS}
            deliveryOptions={DELIVERY_OPTIONS}
            setDate={setDate}
            onEdit={handleEditClick}
            onClickContinue={handleIncrementStepper}
            onShippingOptionChange={handleChangeWarehouse}
            onDeliveryOptionChange={handleDeliveryChange}
          />

          <Payment
            stepper={stepper}
            handleIncrementStepper={handleIncrementStepper}
          />
        </div>

        <div className="hidden lg:block md:col-span-4">
          <OrderSummary
            gst={39.5}
            deliveryCharge={39.71}
            cardSubCharge={39.25}
            subtotal={getCartSubtotal(cartData)}
            total={getCartTotal(cartData, 39.71, 39.5)}
          />
        </div>
      </div>
    </>
  );
};

export default CartDetails;
