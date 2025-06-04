import { CartsQuery } from '@/lib/gql/graphql';
import { getProductPricing } from './product';

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
    const product = item?.product;
    const priceList = product?.price_lists || [];

    const { displayPrice } = getProductPricing(priceList, userLevel, quantity);

    return acc + quantity * displayPrice;
  }, 0);
};

const CARD_SURCHARGE = 0.0102;
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
