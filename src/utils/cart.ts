import { CartsQuery } from '@/lib/gql/graphql';

type Cart = CartsQuery['carts'];

export const formatCurrency = (value?: number, currency?: string) => {
  if (!value) return '0.00';
  return value?.toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getCartSubtotal = (cartItems: Cart, userLevel?: string) => {
  return cartItems.reduce((acc, item) => {
    const quantity = item?.quantity ?? 0;
    const genericPrice = item?.product?.price_lists?.find(
      (price) =>
        price?.user_level === userLevel &&
        !price?.min_quantity &&
        !price?.max_quantity
    );

    const priceBaseOnTablePrice = item?.product?.price_lists?.find(
      (price) =>
        (price?.min_quantity || -Infinity) < quantity &&
        (price?.max_quantity || Infinity) > quantity
    );

    const realPrice =
      priceBaseOnTablePrice?.comparePrice ||
      priceBaseOnTablePrice?.price ||
      genericPrice?.comparePrice ||
      genericPrice?.price ||
      0;

    return acc + quantity * realPrice;
  }, 0);
};

const CARD_SURCHARGE = 0.012;
const GST = 0.1;

export const getCartTotals = (
  cartItems: Cart,
  options?: {
    userLevel?: string;
    deliveryFee?: number;
    isCheckoutPaidWithCard?: boolean;
  }
) => {
  const userLevel = options?.userLevel;
  const deliveryFee = options?.deliveryFee || 0;
  const isCheckoutPaidWithCard = options?.isCheckoutPaidWithCard;

  const subTotal = getCartSubtotal(cartItems, userLevel);

  const cardSurcharge = (deliveryFee + subTotal) * CARD_SURCHARGE;

  const doesCheckoutUseCard = isCheckoutPaidWithCard ? cardSurcharge : 0;

  const gst = (subTotal + doesCheckoutUseCard + deliveryFee) * GST;

  const total = subTotal + deliveryFee + doesCheckoutUseCard + gst;

  return {
    subTotal,
    cardSurcharge,
    gst,
    total,
  };
};
