'use client';
import React, { useState } from 'react';
import CheckoutHeader from '@/components/Checkout/CheckoutHeader';
import ReviewItems from './ReviewItems';
import ShippingDetails from './ShippingDetails';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { formatCurrency, getCartTotals } from '@/utils/cart';
import { useMutation, useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import USER_OPERATIONS from '@/graphql/users';
import ORDER_OPERATIONS from '@/graphql/order';
import {
  CARD_FEE,
  DELIVERY_OPTIONS,
  WAREHOUSE_LOCATIONS,
} from '@/constant/shipping';
import ModalWrapper from './ModalWrapper';
import { ShippingDetailsTypes } from '@/lib/types';

interface CartDetailsProps {
  authToken?: any;
  userEmail?: string;
}

const CartDetails: React.FC<CartDetailsProps> = ({ authToken, userEmail }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [stepper, setStepper] = React.useState<number>(1);
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemToRemove, setItemToRemove] = React.useState<string>('');
  const [shippingDetails, setShipDetails] = useState<ShippingDetailsTypes>({
    companyName: undefined,
    shippingAddress: undefined,
    deliveryOptions: undefined,
    warehouseLocation: 0,
  });

  const { data: userData } = useQuery(USER_OPERATIONS.Queries.user, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted: (data) => {
      if (!data?.user) return;
      const { user } = data;
      const activeShippingAddress =
        user.account_detail?.shipping_addresses?.find(
          (address) => address?.isActive === true
        );
      setShipDetails((prevShipDetails) => ({
        ...prevShipDetails,
        companyName: user.account_detail?.business_name || '',
        shippingAddress: activeShippingAddress
          ? {
              name: {
                first_name: activeShippingAddress.name?.first_name || '',
                middle_name: activeShippingAddress.name?.middle_name || '',
                last_name: activeShippingAddress.name?.last_name || '',
              },
              phone: user.account_detail?.phone || '',
              street: activeShippingAddress.street || '',
              suburb: activeShippingAddress.suburb || '',
              state_territory: activeShippingAddress.state_territory || '',
              postcode: activeShippingAddress.postcode || '',
              country: activeShippingAddress.country || '',
            }
          : undefined,
      }));
    },
    onError: (error) => {
      console.error('ERROR', error);
    },
    variables: {
      filters: {
        email: userEmail,
        username: userEmail,
      },
    },
  });

  useQuery(CART_OPERATIONS.Query.cartItems, {
    onCompleted: (data) => {
      if (!data?.carts) return;
      setCartItems(data?.carts);
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
          const data = {
            cart_items: cartItems.map((item) => ({
              title: item.title,
              quantity: item.quantity,
              price: item.price,
              odoo_product_id: item.odoo_product_id,
            })),
            shipping: {
              delivery_option: shippingDetails.deliveryOptions,
              shipping_details: shippingDetails.shippingAddress,
              warehouse_location: shippingDetails.warehouseLocation,
            },
          };

          createOrder({
            variables: {
              data: data,
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
    if (!cartItems.length) return;

    setCartItems((prevCartData) => {
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
      };

      return newCartData;
    });
  };

  const handleReduceItemQuantity = (id: string) => {
    if (!cartItems.length) return;

    setCartItems((prevCartData) => {
      const itemIndex = prevCartData.findIndex(
        (item) => item?.documentId === id
      );

      if (itemIndex === -1) return prevCartData;

      const item = prevCartData[itemIndex];
      if (!item || item.quantity < 2) {
        setShowModal(true);
        setItemToRemove(item.documentId);
        return prevCartData;
      }

      const { quantity } = item;

      return prevCartData.map((cartItem, index) =>
        index === itemIndex ? { ...cartItem, quantity: quantity - 1 } : cartItem
      );
    });
  };

  const handleOnInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!value || isNaN(parseInt(value, 10))) return;

    if (!cartItems.length) return;

    setCartItems((prevCartData) => {
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

  const handleChangeWarehouse = (id: string) => {
    setShipDetails((prev: any) => ({
      ...prev,
      warehouseLocation: parseInt(id),
    }));
  };

  const handleDeliveryChange = (id: string) => {
    const selectedDeliveryOption = DELIVERY_OPTIONS.find(
      (option) => option.id === id
    );
    if (!selectedDeliveryOption) return;
    setShipDetails((prev: ShippingDetailsTypes) => ({
      ...prev,
      deliveryOptions: {
        title: selectedDeliveryOption.label,
        price: selectedDeliveryOption.price,
        eta: selectedDeliveryOption.eta,
      },
    }));
  };

  const handleConfirmRemove = () => {
    setCartItems((prevCartData) =>
      prevCartData.filter((cartItem) => cartItem?.documentId !== itemToRemove)
    );
    setShowModal(false);
    setItemToRemove('');
  };

  const deliveryFee = shippingDetails?.deliveryOptions?.price
    ? shippingDetails?.deliveryOptions?.price
    : 0;
  const { subtotal, totalGst, total } = getCartTotals(
    cartItems,
    deliveryFee,
    CARD_FEE
  );

  return (
    <>
      <CheckoutHeader stepper={stepper} />
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4">
        Checkout
      </h1>

      <div className="md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          <ReviewItems
            warehouseLocation={WAREHOUSE_LOCATIONS}
            cartItems={cartItems}
            stepper={stepper}
            onChangeWarehouse={handleChangeWarehouse}
            onEdit={handleEditClick}
            onChange={handleOnInputChange}
            onAddQuant={handleAddItemQuantity}
            onReduceQuant={handleReduceItemQuantity}
            onClickContinue={handleIncrementStepper}
          />

          <ShippingDetails
            date={date}
            stepper={stepper}
            setDate={setDate}
            onEdit={handleEditClick}
            onClickChangeShipAddress={() => {
              console.log('redirect to addresses');
            }}
            companyName={userData?.user?.account_detail?.business_name || ''}
            selectedShippingDetails={shippingDetails}
            onClickContinue={handleIncrementStepper}
            onChangeDeliveryOpt={handleDeliveryChange}
          />

          <Payment
            stepper={stepper}
            handleIncrementStepper={handleIncrementStepper}
          />
        </div>

        <div className="hidden lg:block md:col-span-4">
          <OrderSummary
            shippingDetails={shippingDetails}
            shippingFee={formatCurrency(deliveryFee, 'USD')}
            cardSubCharge={formatCurrency(CARD_FEE, 'USD')}
            gst={formatCurrency(totalGst, 'USD')}
            subtotal={formatCurrency(subtotal, 'USD')}
            total={formatCurrency(total, 'USD')}
          />
        </div>
      </div>

      <ModalWrapper
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="You are about to remove this item from your cart."
        message="Are you sure you want to remove this item from your cart?"
      />
    </>
  );
};

export default CartDetails;
