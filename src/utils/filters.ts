import { EXCLUDED_SEARCH_PARAMS } from '@/constant';

export const createProductsFilters = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  let f = {};
  Object.entries({ ...params, ...searchParams })
    .filter(([key]) => !EXCLUDED_SEARCH_PARAMS.includes(key))
    .forEach(([key, value]) => {
      if (key === 'brand') {
        f = {
          ...f,
          brand: {
            url: {
              in: value,
            },
          },
        };
      }
    });
  return f;
};
