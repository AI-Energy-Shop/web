import { useQuery } from '@apollo/client';
import PRODUCT_OPERATIONS from '@/graphql/products';
import { BrandsQuery, BrandsQueryVariables } from '@/lib/gql/graphql';

type UseBrandsProps = {
  variables?: BrandsQueryVariables;
};

const useBrands = (props?: UseBrandsProps) => {
  const { data, loading, refetch, error } = useQuery<
    BrandsQuery,
    BrandsQueryVariables
  >(PRODUCT_OPERATIONS.Query.brands, {
    variables: props?.variables,
    fetchPolicy: 'no-cache',
  });

  return { brands: data?.brands || [], loading, error, refetch };
};

export default useBrands;
