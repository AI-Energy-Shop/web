'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import PRODUCT_OPERATION from '@/graphql/products';
import COLLECTION_OPERATION from '@/graphql/collections';
import { capsAllFirstCharWithDash, capsAllFirstCharWithUnderScore } from '@/utils/string';
import {
  CollectionsWithProductsQuery,
  CollectionsWithProductsQueryVariables,
  ProductFiltersInput,
} from '@/lib/gql/graphql';
import { ACCEPTED_MAIN_FILTERS } from '@/constant/product';

export interface Filter {
  id: string;
  key: string;
  value?: string[] | string;
  __typename: string;
}

export interface SelectedFilter {
  id: string;
  key: string;
  value: string;
}

const useProductFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const [filterOptions, setFilterOptions] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [collectionFilters, setCollectionFilters] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<ProductFiltersInput>({});

  const { data: productsData } = useQuery(PRODUCT_OPERATION.Query.products, {
    variables: {
      filters: {
        collections: {
          handle: {
            eq: params.collection as string,
          },
        },
      },
    },
  });

  const { data: collectionData, loading: collectionLoading } = useQuery<
    CollectionsWithProductsQuery,
    CollectionsWithProductsQueryVariables
  >(COLLECTION_OPERATION.Query.collectionsWithProducts, {
    variables: {
      collectionsFilters: collectionFilters,
      productsFilters: productFilters,
      productsPagination: {},
    },
  });

  const productsFromProducts = productsData?.products || [];
  const productsFromCollection = collectionData?.collections[0]?.products || [];
  const acceptedFilters = collectionData?.collections[0]?.productFilters;

  const buildProductFilters = useCallback(() => {
    const filters: any = {};
    const newSelected: SelectedFilter[] = [];

    searchParams
      .toString()
      .split('&')
      .forEach((param, index) => {
        const [rawKey, rawValue] = param.split('=');
        if (!rawKey || !rawValue) return;

        const key = capsAllFirstCharWithDash(rawKey);
        const value = rawValue.replaceAll('+', ' ');
        newSelected.push({
          id: `${rawKey}-${index}`,
          key,
          value,
        });

        switch (rawKey) {
          case 'brand':
            filters.brand = filters.brand || {
              name: { in: [] },
            };
            filters.brand.name.in.push(value);
            break;
          case 'product-type':
            filters.product_type = {
              eq: value,
            };
            break;
          default:
            const formattedKey = capsAllFirstCharWithDash(rawKey);
            const formattedValue = value;

            if (!filters.specifications) {
              filters.specifications = { or: [] };
            }

            filters.specifications.or.push({
              key: {
                eq: formattedKey,
              },
              value: {
                in: [formattedValue],
              },
            });
            break;
        }
      });

    setProductFilters(filters);
    setSelectedFilters(newSelected);
  }, [searchParams]);

  useEffect(() => {
    buildProductFilters();
    return () => setProductFilters({});
  }, [searchParams, buildProductFilters]);

  useEffect(() => {
    if (params.collection) {
      setCollectionFilters({
        handle: {
          eq: params.collection,
        },
      });
    }
    return () => setCollectionFilters({});
  }, [params]);

  const normalizeKey = (key: string) => capsAllFirstCharWithUnderScore(key);
  const normalizeValue = (value: string) => value;

  const extractAndGroupFilters = (products: any[] = []) => {
    const filters: Filter[] = [];

    products.forEach((product) => {
      const productType = product?.product_type;
      if (acceptedFilters?.some((filter) => filter?.title === 'Product Type')) {
        filters.push({
          id: `product_type${product?.documentId}`,
          key: 'Product Type',
          value: productType,
          __typename: 'ProductType',
        });
      }

      product?.specifications?.forEach((spec: any) => {
        const isAccepted = acceptedFilters?.some((filter) => filter?.title === spec?.key.replaceAll('_', ' '));

        if (isAccepted) {
          filters.push({
            id: spec?.documentId || '',
            key: spec?.key || '',
            value: spec?.value,
            __typename: spec?.__typename || '',
          });
        }
      });
    });

    const grouped: Record<string, Filter> = {};
    filters.forEach((spec) => {
      const key = normalizeKey(spec.key);
      const value = normalizeValue(spec.value as string);

      if (!grouped[key]) {
        grouped[key] = {
          id: spec.id,
          key,
          value: [],
          __typename: spec.__typename,
        };
      }

      (grouped[key].value as string[]).push(value);
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    if (collectionLoading) return;

    const baseFilters = extractAndGroupFilters(productsFromProducts);
    setFilterOptions(baseFilters);
    setProductCount(productsFromProducts?.length || 0);

    const isEqual = productsFromProducts?.length === productsFromCollection?.length;

    if (!isEqual && productsFromProducts?.length > 0) {
      const updatedFilters = extractAndGroupFilters(productsFromCollection);
      const baseProductsFilters = extractAndGroupFilters(productsFromProducts);

      setFilterOptions((prev) =>
        prev.map((spec) => {
          // For preserved filters, keep all options from the base products
          if (ACCEPTED_MAIN_FILTERS.includes(spec.key)) {
            return baseProductsFilters.find((u) => u.key === spec.key) || spec;
          }
          // For other filters, use the filtered collection products
          return updatedFilters.find((u) => u.key === spec.key) || spec;
        })
      );
    }

    return () => {
      setFilterOptions([]);
      setProductCount(0);
    };
  }, [collectionData, productsData]);

  const handleSortChange = (value: string) => {
    router.push(`${pathname}?sort=${value}`, { scroll: false });
  };

  const handleFilterClick = ({ key, value }: SelectedFilter) => {
    const filterKey = key.toLowerCase().replaceAll(' ', '-');
    const filterValue = value;
    const param = `${filterKey}=${filterValue}`;
    let current = searchParams.toString();
    let currentParams = searchParams
      .toString()
      .split('&')
      .map((entry) => {
        const [_, rawValue] = entry.split('=');
        return rawValue?.replaceAll('+', ' ');
      });

    const updatedParams = currentParams.includes(filterValue)
      ? current
          .split('&')
          .filter((entry) => {
            const [_, rawValue] = entry.split('=');
            if (rawValue && rawValue.replaceAll('+', ' ') == filterValue) {
              return false;
            }
            return true;
          })
          .join('&')
      : [...current.split('&').filter(Boolean), param].join('&');

    router.push(`${pathname}?${updatedParams}`, { scroll: false });
  };

  const handleRemoveFilter = useCallback(
    ({ key, value }: SelectedFilter) => {
      const filterKey = key.toLowerCase().replaceAll(' ', '-');
      const filterValue = value.replaceAll('%20', ' ');
      const target = `${filterKey}=${filterValue}`;

      const newParams = searchParams
        .toString()
        .split('&')
        .filter((entry) => entry.replaceAll('+', ' ') !== target)
        .join('&');
      setSelectedFilters((prev) => prev.filter((f) => f.value !== value));
      router.replace(`${pathname}?${newParams}`, { scroll: false });
    },
    [searchParams, pathname]
  );

  const removeAllFilters = useCallback(() => {
    setSelectedFilters([]);
    router.replace(pathname, {
      scroll: false,
    });
  }, [pathname]);

  const handleBrandClick = (brand?: string) => {
    if (!brand) return;
    router.push(`/collections/${brand}`, { scroll: false });
  };

  return {
    pathname,
    productCount,
    filterOptions,
    selectedFilters,
    searchParams,
    collectionLoading,
    collectionData,
    showMobileFilters,
    setShowMobileFilters,
    handleBrandClick,
    handleSortChange,
    handleFilterClick,
    handleRemoveFilter,
    removeAllFilters,
  };
};

export default useProductFilter;
