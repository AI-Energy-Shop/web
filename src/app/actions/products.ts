'use server';
import PRODUCT_OPERATIONS from '@/graphql/products';
import { getClient } from '@/apollo/client';
import { FetchResult } from '@apollo/client';
import { cookies } from 'next/headers';
import {
  CreateProductMutation,
  CreateProductMutationVariables,
  ProductsQuery,
  ProductQuery,
  PaginationArg,
  ProductFiltersInput,
  CreatePriceMutation,
  CreateInventoryMutation,
  UpdatePriceMutation,
  UpdateInventoryMutation,
  CreateSpecificationMutation,
  DeleteSpecificationMutation,
  Enum_Specification_Key,
  UpdateSpecificationMutation,
  DeletePriceMutation,
  DeleteInventoryMutation,
  CreateKeyFeatureMutation,
  UpdateKeyFeatureMutation,
  DeleteKeyFeatureMutation,
  CreateShippingMutation,
  UpdateShippingMutation,
  DeleteShippingMutation,
} from '@/lib/gql/graphql';

const client = getClient();

export const products = async (variables?: {
  filters: ProductFiltersInput;
  pagination: PaginationArg;
}): Promise<FetchResult<ProductsQuery>> => {
  try {
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.products,
      fetchPolicy: 'no-cache',
      variables: variables,
    });

    return res;
  } catch (error: any) {
    console.error("ERROR product's:", error.message);
    return error;
  }
};

export const product = async (
  id: string
): Promise<FetchResult<ProductQuery>> => {
  try {
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.product,
      fetchPolicy: 'no-cache',
      variables: {
        documentId: id,
      },
    });

    return res;
  } catch (error: any) {
    console.error('ERROR FETCHING PRODUCT:', error);
    return error;
  }
};

export const createProduct = async (
  variables: CreateProductMutationVariables
): Promise<FetchResult<CreateProductMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createProduct,
      variables: variables,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    if (res.data === null) {
      throw new Error('Failed to create product');
    }

    return res;
  } catch (error: any) {
    throw error;
  }
};

export const updateProduct = async (data: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  const inputData = JSON.parse(data);
  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateProduct,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log('ERROR updating product:', error.message);
    return error;
  }
};

export const createPrice = async (
  data: string
): Promise<FetchResult<CreatePriceMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.createPrice,
          variables: {
            data: {
              sale_price: item.sale_price,
              price: item.price,
              min_quantity: item.min_quantity,
              max_quantity: item.max_quantity,
              user_level: item.user_level,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<CreatePriceMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating price:', error.message);
    return error;
  }
};

export const updatePrice = async (
  data: string
): Promise<FetchResult<UpdatePriceMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.updatePrice,
          variables: {
            documentId: item.documentId,
            data: {
              sale_price: item.sale_price,
              price: item.price,
              min_quantity: item.min_quantity,
              max_quantity: item.max_quantity,
              user_level: item.user_level,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<CreatePriceMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR updating price:', error.message);
    return error;
  }
};

export const deletePrice = async (
  data: string
): Promise<FetchResult<DeletePriceMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.deletePrice,
          variables: {
            documentId: item.documentId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<DeletePriceMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting price:', error.message);
    return error;
  }
};

export const createInventory = async (
  data: string
): Promise<FetchResult<CreateInventoryMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.createInventory,
          variables: {
            data: {
              location_code: item.location,
              quantity: item.quantity,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<CreateInventoryMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating inventory:', error.message);
    return error;
  }
};

export const updateInventory = async (
  data: string
): Promise<FetchResult<UpdateInventoryMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.updateInventory,
          variables: {
            documentId: item.documentId,
            data: {
              location_code: item.location_code,
              quantity: item.quantity,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<UpdateInventoryMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating inventory:', error.message);
    return error.message;
  }
};

export const deleteInventory = async (
  data: string
): Promise<FetchResult<DeleteInventoryMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.deleteInventory,
          variables: {
            documentId: item.documentId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<DeleteInventoryMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting inventory:', error.message);
    return error;
  }
};

export const createSpecification = async (
  data: string
): Promise<FetchResult<CreateSpecificationMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(
        async (item: { key: Enum_Specification_Key; value: string }) => {
          console.log('item', item);
          const mutateRes = await client.mutate({
            mutation: PRODUCT_OPERATIONS.Mutation.createSpecification,
            variables: {
              data: {
                key: item.key as Enum_Specification_Key,
                value: item.value,
              },
            },
            context: {
              headers: {
                Authorization: `Bearer ${token?.value}`,
              },
            },
          });
          return mutateRes;
        }
      )
    )) as unknown as Promise<FetchResult<CreateSpecificationMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating inventory:', error.message);
    return error;
  }
};

export const updateSpecification = async (
  data: string
): Promise<FetchResult<UpdateSpecificationMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(
        async (item: {
          documentId: string;
          key: Enum_Specification_Key;
          value: string;
        }) => {
          console.log('item', item);
          const mutateRes = await client.mutate({
            mutation: PRODUCT_OPERATIONS.Mutation.updateSpecification,
            variables: {
              documentId: item.documentId,
              data: {
                key: item.key as Enum_Specification_Key,
                value: item.value,
              },
            },
            context: {
              headers: {
                Authorization: `Bearer ${token?.value}`,
              },
            },
          });
          return mutateRes;
        }
      )
    )) as unknown as Promise<FetchResult<UpdateSpecificationMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating inventory:', error.message);
    return error;
  }
};

export const deleteSpecification = async (
  data: string
): Promise<FetchResult<DeleteSpecificationMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  try {
    const res = (await Promise.all(
      inputData.map(async (item: { documentId: string }) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.deleteSpecification,
          variables: {
            documentId: item.documentId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<DeleteSpecificationMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting specification:', error.message);
    return error;
  }
};

export const createKeyFeature = async (
  data: string
): Promise<FetchResult<CreateKeyFeatureMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: { feature: string }) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.createKeyFeature,
          variables: {
            data: {
              feature: item.feature,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<CreateKeyFeatureMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR creating key feature:', error.message);
    return error;
  }
};

export const updateKeyFeature = async (
  data: string
): Promise<FetchResult<UpdateKeyFeatureMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: { documentId: string; feature: string }) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.updateKeyFeature,
          variables: {
            documentId: item.documentId,
            data: {
              feature: item.feature,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<UpdateKeyFeatureMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR updating key feature:', error.message);
    return error;
  }
};

export const deleteKeyFeature = async (
  data: string
): Promise<FetchResult<DeleteKeyFeatureMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: { documentId: string }) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.deleteKeyFeature,
          variables: {
            documentId: item.documentId,
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        return mutateRes;
      })
    )) as unknown as Promise<FetchResult<DeleteKeyFeatureMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting key feature:', error.message);
    return error;
  }
};

export const createShipping = async (
  data: string
): Promise<FetchResult<CreateShippingMutation>> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createShipping,
      variables: {
        data: {
          height: Number(inputData.height),
          width: Number(inputData.width),
          length: Number(inputData.length),
          weight: Number(inputData.weight),
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log('ERROR creating shipping:', error.message);
    return error;
  }
};
