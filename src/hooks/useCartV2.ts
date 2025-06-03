import { useAppDispatch, useAppSelector, RootState } from '@/store/store';
import { setCarts, setShowCartWindow } from '@/store/features/cart';
import { useMutation, useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import {
  CartsQuery,
  CreateCartMutation,
  CreateCartMutationVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '@/lib/gql/graphql';
import { useEffect } from 'react';
import { debounce } from 'lodash';

const DEBOUNCE_TIME = 800;

const useCartV2 = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.me.me);

  const { data, refetch, loading } = useQuery<CartsQuery>(
    CART_OPERATIONS.Query.carts,
    {
      fetchPolicy: 'network-only',
      refetchWritePolicy: 'merge',
      pollInterval: 1000 * 60 * 10, // 10 minutes
      skip: !user?.id, // Skip query if no user is logged in
    }
  );

  const [addToCartItem] = useMutation<
    CreateCartMutation,
    CreateCartMutationVariables
  >(CART_OPERATIONS.Mutation.createCart, {
    onCompleted: () => {
      console.log('Cart item added');
      refetch();
      // Show the notification
      dispatch(setShowCartWindow(true));
      // Hide the notification after 3 seconds
      setTimeout(() => {
        dispatch(setShowCartWindow(false));
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [updateCartItem] = useMutation<
    UpdateCartMutation,
    UpdateCartMutationVariables
  >(CART_OPERATIONS.Mutation.updateCart, {
    onCompleted: () => {
      console.log('Cart item updated');
      refetch();
      // Show the notification
      dispatch(setShowCartWindow(true));
      // Hide the notification after 3 seconds
      setTimeout(() => {
        dispatch(setShowCartWindow(false));
      }, 3000);
    },
    onError: (error) => {
      console.log('Error updating cart item', error);
    },
  });

  const [deleteCartItem] = useMutation(CART_OPERATIONS.Mutation.deleteCart, {
    onCompleted: (data) => {
      refetch();
      console.log('Cart item deleted', data);
    },
    onError: (error) => {
      console.log('Error deleting cart item', error);
    },
  });

  // Debounced update function
  const debouncedUpdateCartItem = debounce(
    ({ documentId, quantity }: { documentId: string; quantity: number }) => {
      if (documentId) {
        updateCartItem({
          variables: {
            documentId,
            data: { quantity },
          },
        });
      }
    },
    DEBOUNCE_TIME
  );

  // Debounced remove function
  const debouncedRemoveCartItem = debounce(
    ({ documentId }: { documentId: string }) => {
      if (documentId) {
        deleteCartItem({
          variables: {
            documentId,
          },
        });
      }
    },
    DEBOUNCE_TIME
  );

  useEffect(() => {
    if (data) {
      dispatch(setCarts(data.carts));

      // Show the notification
      dispatch(setShowCartWindow(true));

      // Hide the notification after 3 seconds
      setTimeout(() => {
        dispatch(setShowCartWindow(false));
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    carts: data?.carts || [],
    loading,
    debouncedUpdateCartItem,
    debouncedRemoveCartItem,
    refetch,
    addToCartItem,
    deleteCartItem,
    updateCartItem,
  };
};

export default useCartV2;
