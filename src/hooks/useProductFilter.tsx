'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import PRODUCT_OPERATION from '@/graphql/products';
import {
  capsAllFirstCharWithDash,
  capsAllFirstCharWithUnderScore,
} from '@/utils/string';
import {
  EXCLUDED_SEARCH_PARAMS,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';

export interface Filter {
  id: string;
  key: string;
  value: any;
  valueCount: number;
  __typename: string;
}
export interface SelectedFilter {
  id: string;
  key: string;
  valueCount: number;
  value: string[];
}

const useProductFilter = () => {
  const [filterOptions, setFilterOptions] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const exludedFilterOptions = useMemo(() => {
    const options = ['Product Model'];
    if (params.brandSlug) {
      options.push('Brand');
    }
    return options;
  }, [params.brandSlug]);

  const filters = () => {
    let f = {};
    Object.entries(params)
      .filter(([key]) => !EXCLUDED_SEARCH_PARAMS.includes(key))
      .forEach(([key, value]) => {
        if (key === 'brand') {
          f = {
            ...f,
            [key]: {
              url: {
                eq: value,
              },
            },
          };
        }
        if (key === 'category') {
          f = {
            ...f,
            categories: {
              slug: {
                eq: value,
              },
            },
          };
        }
      });

    return f;
  };

  const { data } = useQuery(PRODUCT_OPERATION.Query.products, {
    variables: {
      filters: filters(),
      pagination: {
        page: Number(searchParams.get('page')) || INITIAL_PAGE,
        pageSize: Number(searchParams.get('pageSize')) || INITIAL_PAGE_SIZE,
      },
    },
  });

  useEffect(() => {
    if (data?.products) {
      const filterOpts: Filter[] = [];

      data.products?.forEach((product) =>
        product?.specifications?.forEach((spec) => {
          filterOpts.push({
            id: spec?.documentId || '',
            key: spec?.key || '',
            value: spec?.value || '',
            valueCount: 0,
            __typename: spec?.__typename || '',
          });
        })
      );

      const combinedSpecifications = filterOpts.reduce(
        (acc: any, spec: any, index: number) => {
          const capsKey = capsAllFirstCharWithUnderScore(spec.key);
          const capsValue = capsAllFirstCharWithDash(spec.value);
          if (!acc[capsKey]) {
            acc[capsKey] = {
              id: spec.id,
              key: capsKey,
              value: [],
              valueCount: 0,
              __typename: spec.__typename,
            };
          }
          acc[capsKey].value.push(capsValue);
          return acc;
        },
        {}
      );

      const uniqueSpecifications = Object.values(
        combinedSpecifications
      ) as Filter[];

      const filteredFilterOptions = uniqueSpecifications.filter(
        (option) => !exludedFilterOptions.includes(option.key)
      );

      setFilterOptions(filteredFilterOptions);
    }
  }, [data, exludedFilterOptions]);

  const handleFilterChange = (key: string, value: string, id: string) => {
    setSelectedFilters((prevFilters) => {
      const existingFilter = prevFilters.find((filter) => filter.key === key);

      if (!existingFilter) {
        return [...prevFilters, { key, value: [value], id, valueCount: 0 }];
      } else {
        return prevFilters.map((filter) => {
          if (filter.key === key) {
            return {
              ...filter,
              value: [...filter.value, value],
              valueCount: 0,
            };
          }
          return filter;
        });
      }
    });
  };

  const handleRemoveFilter = useCallback(
    (selectedFilter: SelectedFilter) => {
      setSelectedFilters((prevFilters) => {
        const newFilters = prevFilters.filter(
          (filter) => filter.value !== selectedFilter.value
        );
        return newFilters;
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete(selectedFilter.key);

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(newUrl);
    },
    [searchParams, pathname]
  );

  const removeAllFilters = useCallback(() => {
    setSelectedFilters([]);
    router.replace(pathname);
  }, [pathname]);

  return {
    filterOptions,
    selectedFilters,
    handleFilterChange,
    handleRemoveFilter,
    removeAllFilters,
  };
};

export default useProductFilter;
