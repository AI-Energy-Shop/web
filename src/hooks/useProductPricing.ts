import { GetStoreProductQuery } from '@/lib/gql/graphql';

// Custom hook to handle price logic
const useProductPricing = (
  priceList: any[],
  userLevel?: string,
  currentQuantity: number = 0
) => {
  const sortedPriceList =
    priceList
      ?.map((price) => ({
        documentId: price?.documentId,
        price: price?.price ?? 0,
        comparePrice: price?.comparePrice ?? 0,
        min_quantity: price?.min_quantity ?? 0,
        max_quantity: price?.max_quantity ?? 0,
        user_level: price?.user_level ?? '',
      }))
      .sort((a, b) => a.min_quantity - b.min_quantity) || [];

  // Helper function to find user-specific pricing based on quantity and user level
  const findUserPricing = () => {
    return sortedPriceList?.find((priceItem) => {
      const { min_quantity = 0, max_quantity = 0, user_level } = priceItem;

      return (
        user_level === userLevel &&
        currentQuantity >= min_quantity &&
        (max_quantity === 0 || currentQuantity <= max_quantity)
      );
    });
  };

  // Helper function to find default pricing
  const findDefaultPricing = () => {
    return sortedPriceList?.find(
      (priceItem) => priceItem?.user_level === 'default'
    );
  };

  // Determine which pricing to display
  const userSpecificPricing = findUserPricing();
  const defaultPricing = findDefaultPricing();
  const displayPricing = userSpecificPricing || defaultPricing;

  // Helper function to get the main price to display
  const getDisplayPrice = (priceData: typeof displayPricing) => {
    return priceData?.price || priceData?.comparePrice || 0;
  };

  return {
    priceList,
    defaultPricing,
    userSpecificPricing,
    displayPricing,
    displayPrice: getDisplayPrice(displayPricing),
    comparePrice: displayPricing?.comparePrice || 0,
  };
};

export default useProductPricing;
