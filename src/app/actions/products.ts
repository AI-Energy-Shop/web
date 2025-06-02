'use server';
import PRODUCT_OPERATIONS from '@/graphql/products';
import { getClient } from '@/apollo/client';
import { ApolloError, FetchResult } from '@apollo/client';
import { cookies } from 'next/headers';
import {
  CustomProductCreateMutation,
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
  UpdateSpecificationMutation,
  DeletePriceMutation,
  DeleteInventoryMutation,
  CreateKeyFeatureMutation,
  UpdateKeyFeatureMutation,
  DeleteKeyFeatureMutation,
  CreateShippingMutation,
  CustomProductUpdateMutation,
  DeleteProductMutation,
  UpdateShippingMutation,
  DeleteShippingMutation,
  GetStoreProductQuery,
} from '@/lib/gql/graphql';
import {
  handleGraphQLError,
  GraphQLException,
} from '@/lib/utils/graphql-error';

const client = getClient();

// PRODUCTS
export const products = async (variables?: {
  filters: ProductFiltersInput;
  pagination: PaginationArg;
  sort?: string[];
}): Promise<FetchResult<ProductsQuery>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  const context = token
    ? {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    : undefined;
  try {
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.products,

      fetchPolicy: 'no-cache',
      variables: {
        ...variables,
        _timestamp: Date.now(),
      },
      context,
    });
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('error in products', errorMessage);
    return error;
  }
};

export const product = async (
  id: string
): Promise<FetchResult<ProductQuery>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('a-token');
    const context = token
      ? {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      : undefined;
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.product,
      fetchPolicy: 'no-cache',
      variables: {
        documentId: id,
        _timestamp: Date.now(),
      },
      context,
    });
    // revalidatePath(`/admin/products/${id}`);
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('error in products', errorMessage);
    return error;
  }
};

export const storeProducts = async (variables?: {
  filters: ProductFiltersInput;
  pagination: PaginationArg;
  sort?: string[];
}): Promise<FetchResult<GetStoreProductQuery>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('a-token');
    const context = token
      ? { headers: { Authorization: `Bearer ${token?.value}` } }
      : undefined;

    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.storeProducts,
      fetchPolicy: 'no-cache',
      variables: {
        ...variables,
      },
      context,
    });

    return res;
  } catch (error: any) {
    // const errorMessage = handleGraphQLError(error);
    // console.log('error in products', errorMessage);

    if (error instanceof Error) {
      console.log('error', error.message);
    }

    if (error instanceof ApolloError) {
      console.log('error', error);
    }
    return error;
  }
};

export const storeProduct = async (
  handle: string
): Promise<FetchResult<GetStoreProductQuery>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('a-token');
    const context = token
      ? {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      : undefined;

    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.storeProduct,
      fetchPolicy: 'no-cache',
      variables: {
        handle: handle,
      },
      context,
    });
    // revalidatePath(`/admin/products/${handle}`);
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('error in products', errorMessage);
    return error;
  }
};

export const createProducts = async (
  data: string
): Promise<{
  data?: FetchResult<CustomProductCreateMutation>[];
  error?: GraphQLException | Error;
}> => {
  const inputData = JSON.parse(data);
  try {
    const remakedProductsData = await Promise.all(
      inputData.map(async (item: any) => {
        const shippingData = JSON.stringify({
          data: {
            ...item.data.shipping,
          },
        });

        const inventoryData = JSON.stringify({
          data: {
            ...item.data.inventory,
          },
        });

        const [shipping, inventory, specifications, keyFeatures] =
          await Promise.all([
            createShipping(shippingData),
            createInventory(inventoryData),
            createSpecification(JSON.stringify(item.data.specifications)),
            createKeyFeature(JSON.stringify(item.data.key_features)),
          ]);

        const shippingId = shipping.data?.createShipping?.documentId;
        const inventoryId = inventory.data?.createInventory?.documentId;

        const specificationsIds = specifications.map(
          (spec) => spec.data?.createSpecification?.documentId
        );

        const keyFeaturesIds = keyFeatures.map(
          (feature) => feature.data?.createKeyFeature?.documentId
        );

        return {
          ...item.data,
          shipping: shippingId,
          inventory: inventoryId,
          specifications: specificationsIds,
          key_features: keyFeaturesIds,
        };
      })
    );

    // console.log('remakedProductsData', remakedProductsData);

    const res = await Promise.all(
      remakedProductsData.map(async (product) => {
        const res = await createProduct(
          JSON.stringify({ data: { ...product } })
        );
        return res;
      })
    );

    return res as {
      data?: FetchResult<CustomProductCreateMutation>[];
      error?: GraphQLException | Error;
    };
  } catch (error: any) {
    console.log('ERROR OBJECT', Object.keys(error));
    const errorMessage = handleGraphQLError(error);
    return {
      error: { ...errorMessage },
    };
  }
};

export const createProduct = async (
  data: string
): Promise<{
  data?: FetchResult<CustomProductCreateMutation>;
  error?: GraphQLException | Error;
}> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.customProductCreate,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
      fetchPolicy: 'network-only',
    });

    // revalidatePath(
    //   `/admin/products/${res.data?.customProductCreate?.documentId}`
    // );
    return {
      data: res,
    };
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('error in create product', Object.keys(error.cause));
    console.log('error in create product', error.cause.result.errors);
    return {
      error: { ...errorMessage },
    };
  }
};

export const updateProduct = async (
  data: string
): Promise<{
  data?: FetchResult<CustomProductUpdateMutation>;
  error?: GraphQLException | Error;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  const inputData = JSON.parse(data);
  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateProduct,
      fetchPolicy: 'network-only',
      variables: {
        ...inputData,
        _timestamp: Date.now(),
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return {
      data: res,
    };
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log(
      'error in update product',
      error.cause.extensions.error.details
    );
    return {
      error: { ...errorMessage },
    };
  }
};

export const updateProducts = async (
  data: string
): Promise<{
  data?: FetchResult<CustomProductUpdateMutation>[];
  error?: GraphQLException | Error;
}> => {
  const inputData = JSON.parse(data);
  try {
    const res = await Promise.all(
      inputData.map(async (item: any) => {
        const res = await updateProduct(
          JSON.stringify({
            documentId: item.documentId,
            data: item.data,
          })
        );
        return res;
      })
    );
    return {
      data: res,
    };
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('error in update product', errorMessage);
    return {
      error: { ...errorMessage },
    };
  }
};

export const deleteProducts = async (
  data: string
): Promise<FetchResult<DeleteProductMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        Promise.all([
          deleteInventory(item.inventory),
          deleteShipping(item.shipping),
          deletePrices(JSON.stringify(item.price_lists)),
          deleteKeyFeatures(JSON.stringify(item.key_features)),
          deleteSpecifications(JSON.stringify(item.specifications)),
        ])
          .catch((error: any) => {
            console.log('error in delete products', error);
          })
          .then(() => {
            return client.mutate({
              mutation: PRODUCT_OPERATIONS.Mutation.deleteProduct,
              variables: {
                documentId: item.documentId,
                _timestamp: Date.now(),
              },
              context: {
                headers: {
                  Authorization: `Bearer ${token?.value}`,
                },
              },
            });
          });
      })
    )) as unknown as Promise<FetchResult<DeleteProductMutation>[]>;
    // revalidatePath('/admin/products');
    return res;
  } catch (error: any) {
    console.log('ERROR deleting price:', error.message);
    return error;
  }
};

// PRICES
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
              comparePrice: item.comparePrice,
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
  price: string
): Promise<FetchResult<UpdatePriceMutation>> => {
  const variables = JSON.parse(price);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const mutateRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updatePrice,
      variables,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return mutateRes;
  } catch (error: any) {
    console.log('ERROR updating price:', error.message);
    return error;
  }
};

export const updatePrices = async (
  data: string
): Promise<FetchResult<UpdatePriceMutation>[]> => {
  const inputData = JSON.parse(data);

  try {
    const res = (await Promise.all(
      inputData.map(async (item: any) => {
        const mutateRes = await updatePrice(
          JSON.stringify({
            documentId: item.documentId,
            data: {
              comparePrice: item.comparePrice,
              price: item.price,
              min_quantity: item.min_quantity,
              max_quantity: item.max_quantity,
              user_level: item.user_level,
            },
          })
        );
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
  documentId: string
): Promise<FetchResult<DeletePriceMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  if (!documentId) {
    return {
      data: null,
    };
  }

  try {
    const deleteRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.deletePrice,
      variables: {
        documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return deleteRes;
  } catch (error: any) {
    console.log('ERROR deleting price:', error.message);
    return error;
  }
};

export const deletePrices = async (
  data: string
): Promise<FetchResult<DeletePriceMutation>[]> => {
  const inputData = JSON.parse(data);
  try {
    const res = (await Promise.all(
      inputData.map(async (id: string) => {
        const deleteRes = await deletePrice(id);
        return deleteRes;
      })
    )) as unknown as Promise<FetchResult<DeletePriceMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting price:', error.message);
    return error;
  }
};

// INVENTORY
export const createInventory = async (
  data: string
): Promise<FetchResult<CreateInventoryMutation>> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const mutateRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createInventory,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return mutateRes;
  } catch (error: any) {
    console.log('ERROR creating inventory:', error.message);
    return error;
  }
};

export const updateInventory = async (
  data: string
): Promise<FetchResult<UpdateInventoryMutation>> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const mutateRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateInventory,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return mutateRes;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('errorMessage', errorMessage);

    return error.message;
  }
};

export const deleteInventory = async (
  documentId?: string
): Promise<FetchResult<DeleteInventoryMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  if (!documentId) {
    return {
      data: null,
    };
  }

  try {
    const mutateRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.deleteInventory,
      variables: {
        documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return mutateRes;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('errorMessage', errorMessage);
    return error;
  }
};

// SPECIFICATIONS
export const createSpecification = async (
  data: string
): Promise<FetchResult<CreateSpecificationMutation>[]> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = (await Promise.all(
      inputData.map(async (item: { key: string; value: string }) => {
        const mutateRes = await client.mutate({
          mutation: PRODUCT_OPERATIONS.Mutation.createSpecification,
          variables: {
            data: {
              key: item.key,
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
      })
    )) as unknown as Promise<FetchResult<CreateSpecificationMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR OBJECT', Object.keys(error.cause));
    console.log('error', error.cause.result.errors);
    const errorMessage = handleGraphQLError(error);
    // console.log('errorMessage', errorMessage);
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
        async (item: { documentId: string; key: string; value: string }) => {
          const mutateRes = await client.mutate({
            mutation: PRODUCT_OPERATIONS.Mutation.updateSpecification,
            variables: {
              documentId: item.documentId,
              data: {
                key: item.key,
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
  documentId?: string
): Promise<FetchResult<DeleteSpecificationMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  if (!documentId) {
    return {
      data: null,
    };
  }

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.deleteSpecification,
      variables: {
        documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log('ERROR deleting specification:', error.message);
    return error;
  }
};

export const deleteSpecifications = async (
  data: string
): Promise<FetchResult<DeleteSpecificationMutation>[]> => {
  const inputData = JSON.parse(data);
  try {
    const res = (await Promise.all(
      inputData.map(async (id: string) => {
        const deleteRes = await deleteSpecification(id);
        return deleteRes;
      })
    )) as unknown as Promise<FetchResult<DeleteSpecificationMutation>[]>;
    return res;
  } catch (error: any) {
    console.log('ERROR deleting specification:', error.message);
    return error;
  }
};

// KEY FEATURES
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
    const errorMessage = handleGraphQLError(error);
    console.log('create key feature error', errorMessage);
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
    const errorMessage = handleGraphQLError(error);
    console.log('update key feature error', errorMessage);
    return error;
  }
};

export const deleteKeyFeature = async (
  documentId: string
): Promise<FetchResult<DeleteKeyFeatureMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  if (!documentId) {
    return {
      data: null,
    };
  }

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.deleteKeyFeature,
      variables: {
        documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('delete key feature error', errorMessage);
    return error;
  }
};

export const deleteKeyFeatures = async (
  data: string
): Promise<FetchResult<DeleteKeyFeatureMutation>[]> => {
  const inputData = JSON.parse(data);
  try {
    const res = (await Promise.all(
      inputData.map(async (id: string) => {
        const deleteRes = await deleteKeyFeature(id);
        return deleteRes;
      })
    )) as unknown as Promise<FetchResult<DeleteKeyFeatureMutation>[]>;
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('delete key feature error', errorMessage);
    return error;
  }
};

// SHIPPING
export const createShipping = async (
  data: string
): Promise<FetchResult<CreateShippingMutation>> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createShipping,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('create shipping error', errorMessage);
    return error;
  }
};

export const updateShipping = async (
  data: string
): Promise<FetchResult<UpdateShippingMutation>> => {
  const inputData = JSON.parse(data);
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateShipping,
      variables: inputData,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return res;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('create shipping error', errorMessage);
    return error;
  }
};

export const deleteShipping = async (
  documentId: string
): Promise<FetchResult<DeleteShippingMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  if (!documentId) {
    return {
      data: null,
    };
  }

  try {
    const mutateRes = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.deleteShipping,
      variables: {
        documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    return mutateRes;
  } catch (error: any) {
    const errorMessage = handleGraphQLError(error);
    console.log('delete shipping error', errorMessage);
    return error;
  }
};
