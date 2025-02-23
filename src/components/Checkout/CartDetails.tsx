'use client';
import React, { useState } from 'react';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import ReviewItems from './ReviewItems';
import ShippingDetails from './ShippingDetails';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { formatCurrency, getCartTotals } from '@/utils/cart';
import { useMutation, useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import USER_OPERATIONS from '@/graphql/users';
import ORDER_OPERATIONS from '@/graphql/order';
import { DELIVERY_OPTIONS, WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import ModalWrapper from './ModalWrapper';
import { CartType, ShippingDetailsTypes } from '@/lib/types';
import { CartsQuery } from '@/lib/gql/graphql';
import { Toast } from '@/lib/toast';

interface CartDetailsProps {
  authToken?: string;
  userEmail?: string;
  data?: any;
}

const CartDetails: React.FC<CartDetailsProps> = ({ authToken, userEmail, data }) => {
  const [cartItems, setCartItems] = React.useState<CartType[]>(data?.map((item: any) => ({
    item: item?.item || {},
    documentId: item?.documentId || '',
    updatedAt: item?.updatedAt || '',
    createdAt: item?.createdAt || '',
  })));
  const [date, setDate] = React.useState<Date>(new Date());
  const [stepper, setStepper] = React.useState<number>(1);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemToRemove, setItemToRemove] = React.useState<string>('');

  const [shippingDetails, setShipDetails] = useState<ShippingDetailsTypes>({
    companyName: undefined,
    shippingAddress: undefined,
    deliveryOptions: undefined,
    paymentOption: undefined,
    warehouseLocation: 0,
  });

  const { data: userData } = useQuery(USER_OPERATIONS.Queries.user, {
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
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  useQuery<CartsQuery>(CART_OPERATIONS.Query.carts, {
    onCompleted: (data) => {
      if (!data) return;
      const { carts } = data;
      console.log('CART ITEMS: ', carts);
      if (!carts) return;
      setCartItems(
        carts.map((cart) => ({
          documentId: cart?.documentId || '',
          item: cart?.item || {},
          updatedAt: cart?.updatedAt || '',
          createdAt: cart?.createdAt || '',
        }))
      );
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

  const [removeFromCart] = useMutation(
    CART_OPERATIONS.Mutation.removeFromCart,
    {
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      onCompleted: (data) => {
        Toast('Item removed from cart', "SUCCESS", {
          theme: 'light',
          position: 'top-center',
        });
      },
      onError: (error) => {
        console.error('ERROR', error);
      },
    }
  );

  const handleIncrementStepper = () => {
    try {
      setStepper((prev) => {
        if (prev == null) throw new Error('Stepper value is null');

        if (prev === 3) {
          console.log('submit');
          const data = {
            cart_items: cartItems.map((item) => ({
              item: item.item,
            })),
            shipping: {
              delivery_option: shippingDetails.deliveryOptions,
              shipping_details: shippingDetails.shippingAddress,
              warehouse_location: shippingDetails.warehouseLocation,
            },
          };

          // createOrder({
          //   variables: {
          //     data: data,
          //   },
          // });
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
      const itemIndex = newCartData.findIndex((item) => item.documentId === id);
      if (itemIndex === -1) return newCartData;

      const item = newCartData[itemIndex];
      if (!item) return newCartData;

      newCartData[itemIndex] = {
        ...item,
        item: {
          ...item.item,
          quantity: item.item?.quantity ? item.item.quantity + 1 : 0,
        },
      };

      return newCartData;
    });
  };

  const handleReduceItemQuantity = (id: string) => {
    if (!cartItems.length) return;

    setCartItems((prevCartData) => {
      const itemIndex = prevCartData.findIndex(
        (item) => item.documentId === id
      );

      if (itemIndex === -1) return prevCartData;
      const item = prevCartData[itemIndex];
      if (
        !item ||
        (item.item?.quantity !== undefined && item.item.quantity < 2)
      ) {
        setShowModal(true);
        setItemToRemove(item.documentId || '');
        return prevCartData;
      }
      const quantity = item.item?.quantity ?? 0;

      return prevCartData.map((cartItem, index) =>
        index === itemIndex
          ? {
              ...cartItem,
              item: {
                ...cartItem.item,
                quantity: quantity - 1,
              },
            }
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

    if (!cartItems.length) return;

    setCartItems((prevCartData) => {
      const newCartData = [...prevCartData];
      const itemIndex = newCartData.findIndex((item) => item.item?.id === id);
      if (itemIndex === -1) return newCartData;

      const item = newCartData[itemIndex];
      if (!item) return newCartData;

      const quantity = parseInt(value, 10);
      if (quantity < 0) return newCartData;

      newCartData[itemIndex] = {
        ...item,
        item: {
          ...item.item,
          quantity,
        },
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
      prevCartData.filter((cartItem) => cartItem.documentId !== itemToRemove)
    );

    removeFromCart({
      variables: {
        documentId: itemToRemove,
      },
    });

    setShowModal(false);
    setItemToRemove('');
  };

  const handlePaymentOptionChange = (value: string) => {
    setShipDetails((prev: ShippingDetailsTypes) => ({
      ...prev,
      paymentOption: {
        title: value,
        price: 39.5 * 0.1,
      },
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevCartData) => {
      return prevCartData.filter((cartItem) => cartItem.documentId !== id);
    });
    removeFromCart({
      variables: {
        documentId: id,
      },
    });
  };

  const deliveryFee = shippingDetails?.deliveryOptions?.price
    ? shippingDetails?.deliveryOptions?.price
    : 0;

  const paymentOption = shippingDetails?.paymentOption;

  const { subtotal, totalGst, total } = getCartTotals(
    cartItems,
    deliveryFee,
    paymentOption?.price
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
            onRemoveItem={handleRemoveItem}
            onClickContinue={handleIncrementStepper}
          />

          <ShippingDetails
            date={date}
            stepper={stepper}
            setDate={setDate}
            onEdit={handleEditClick}
            onClickChangeShipAddress={() => {}}
            companyName={userData?.user?.account_detail?.business_name || ''}
            selectedShippingDetails={shippingDetails}
            onClickContinue={handleIncrementStepper}
            onChangeDeliveryOpt={handleDeliveryChange}
          />

          <Payment
            stepper={stepper}
            handleIncrementStepper={handleIncrementStepper}
            paymentOption={shippingDetails?.paymentOption}
            handlePaymentOptionChange={handlePaymentOptionChange}
          />
        </div>

        <div className="hidden lg:block md:col-span-4">
          <OrderSummary
            shippingDetails={shippingDetails}
            shippingFee={formatCurrency(deliveryFee, 'USD')}
            cardSubCharge={formatCurrency(
              shippingDetails?.paymentOption?.price || 0.0,
              'USD'
            )}
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
