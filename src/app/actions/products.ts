'use server';
import { getClient } from '@/apollo/client';
import { PRODUCT_OPERATIONS } from '@/graphql';
import { cookies } from 'next/headers';

const client = getClient();

const addProductPrice = async (pricesList: any[]) => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const { errors, data } = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createProductPriceList,
      variables: {
        data: {
          prices: pricesList,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return {
      data,
      errors,
    };
  } catch (error: any) {
    console.log('Error adding product price:', error.message);

    return {
      errors: error.message,
    };
  }
};

const updateProductPrice = async ({
  documentId,
  prices,
}: {
  documentId: string;
  prices: any[];
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const { errors, data } = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateProductPriceList,
      variables: {
        documentId: documentId,
        data: {
          prices: prices.map((price: any) => {
            if (price.__typename) {
              delete price.__typename;
            }

            return price;
          }),
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return {
      data,
      errors,
    };
  } catch (error: any) {
    console.log('Error updating product price:', error.message);

    return {
      errors: error.message,
    };
  }
};

export const products = async (): Promise<{
  loading?: boolean;
  data?: { products?: any[] };
  error?: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');
  try {
    const { data, loading, error } = await client.query({
      query: PRODUCT_OPERATIONS.Query.products,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return {
      loading,
      data,
      error,
    };
  } catch (error: any) {
    console.log("ERROR fetching product's:", error.message);
    return {
      error: error.message,
      loading: false,
    };
  }
};

export const product = async (
  id: string
): Promise<{
  loading?: boolean;
  data?: { product?: any };
  error?: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const { data, loading, error } = await client.query({
      query: PRODUCT_OPERATIONS.Query.product,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
      variables: {
        documentId: id,
      },
    });

    return {
      loading,
      data,
      error,
    };
  } catch (error: any) {
    console.log('ERROR fetching product:', error.message);
    return {
      error: error.message,
      loading: false,
    };
  }
};

export const createProduct = async (
  product: any
): Promise<{ data?: any; errors?: any }> => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const {
      errors: createProductPriceListError,
      data: createProductPriceListData,
    } = await addProductPrice(product.price_list.prices);

    if (createProductPriceListError) {
      console.log(createProductPriceListError);
      return {
        errors: createProductPriceListError,
      };
    }

    const newProduct = {
      name: product.name,
      description: product.description,
      category: product.category,
      vendor: product.vendor,
      item_code: product.item_code,
      price_list: createProductPriceListData.createPriceList.documentId,
    };

    const { errors, data } = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createProduct,
      variables: {
        data: newProduct,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return {
      data,
      errors,
    };
  } catch (error: any) {
    return {
      errors: error.message,
    };
  }
};

export const updateProduct = async (
  product: any
): Promise<{ data?: any; errors?: any }> => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const { errors: updateProductPriceErr, data: updateProductPriceData } =
      await updateProductPrice(product.price_list);

    if (updateProductPriceErr) {
      console.log(updateProductPriceErr);
      return {
        errors: updateProductPriceErr,
      };
    }

    const updatedProduct = {
      name: product.name,
      description: product.description,
      category: product.category,
      vendor: product.vendor,
      item_code: product.item_code,
      price_list: updateProductPriceData.updatePriceList.documentId,
    };

    const { errors, data } = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateProduct,
      variables: {
        documentId: product.documentId,
        data: updatedProduct,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return {
      data,
      errors,
    };
  } catch (error: any) {
    return {
      errors: error.message,
    };
  }
};
