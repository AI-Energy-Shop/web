import { TagsQuery, TagsQueryVariables } from '@/lib/gql/graphql';
import { useQuery } from '@apollo/client';
import PRODUCT_OPERATIONS from '@/graphql/products';
type UseTagsProps = {
  variables?: TagsQueryVariables;
};

const useTags = (props?: UseTagsProps) => {
  const { data, loading, refetch, error } = useQuery<
    TagsQuery,
    TagsQueryVariables
  >(PRODUCT_OPERATIONS.Query.tags, {
    variables: props?.variables,
    fetchPolicy: 'no-cache',
  });

  return { tags: data?.tags || [], loading, error, refetch };
};

export default useTags;
