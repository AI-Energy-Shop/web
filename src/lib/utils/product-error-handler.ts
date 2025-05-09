import { GraphQLException } from './graphql-error';
import { toast } from 'sonner';

export const handleProductError = (error: GraphQLException) => {
  error.details?.errors?.map((err) => {
    toast.error(`${err.message}: ${err.value}`);
  });
};
