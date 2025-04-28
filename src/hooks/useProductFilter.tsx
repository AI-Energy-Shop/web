'use client';

import { useQuery } from '@apollo/client';
import COLLECTION_OPERATION from '@/graphql/collections';
import { ACCEPTED_MAIN_FILTERS } from '@/constant/product';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { capsAllFirstCharWithDash, capsAllFirstCharWithUnderScore } from '@/utils/string';
import {
  CollectionsWithProductsQuery,
  CollectionsWithProductsQueryVariables,
  ProductsQuery,
} from '@/lib/gql/graphql';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCollectionFilters,
  setProductCount,
  setProductFilters,
  setSelectedFilters,
} from '@/store/features/products';

export interface FilterOption {
  value: string;
  count: number;
}

export interface Filter {
  id: string;
  key: string;
  options: FilterOption[];
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
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const productCount = useAppSelector((state) => state.products.productCount);
  const selectedFilters = useAppSelector((state) => state.products.selectedFilters);
  const productFilters = useAppSelector((state) => state.products.productFilters);
  const collectionFilters = useAppSelector((state) => state.products.collectionFilters);

  const [filterOptions, setFilterOptions] = useState<Filter[]>([]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const cachedCollectionData = useRef<CollectionsWithProductsQuery['collections'] | null>(null);
  const [products, setProducts] = useState<ProductsQuery['products']>([]);
  const [currentSelectedFilter, setCurrentSelectedFilter] = useState<SelectedFilter | null>(null);

  const [revalidateCache, setRevalidateCache] = useState(true);

  const { loading, data } = useQuery<CollectionsWithProductsQuery, CollectionsWithProductsQueryVariables>(
    COLLECTION_OPERATION.Query.collectionsWithProducts,
    {
      variables: {
        collectionsFilters: collectionFilters,
        productsFilters: productFilters,
        productsPagination: {},
      },
      skip: !params.collection,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }
  );

  const extractFilters = useCallback(
    (
      cachedProducts: any[],
      selectedFilters: SelectedFilter[],
      // selectedCollection?: string,
      currentSelectedKey?: string,
      acceptedFilters: any[] = []
    ): Filter[] => {
      const applyFilters = (products: any[]) => {
        // Group filters by their key
        const groupedFilters = selectedFilters.reduce(
          (acc, filter) => {
            if (!acc[filter.key]) {
              acc[filter.key] = [];
            }
            acc[filter.key].push(filter);
            return acc;
          },
          {} as Record<string, SelectedFilter[]>
        );

        return products.filter((product) => {
          // For each group of filters, check if the product matches any of them
          return Object.entries(groupedFilters).every(([key, filters]) => {
            switch (key) {
              case 'Product Type':
                return filters.some((filter) => product?.product_type === filter.value);
              case 'Brand':
                return filters.some((filter) => product?.brand?.name === filter.value);
              default:
                const isExist = filters.some((filter) =>
                  product?.specifications?.some((spec: any) => {
                    return (
                      capsAllFirstCharWithUnderScore(spec.key) === filter.key && spec?.value === filter.value
                    );
                  })
                );
                return isExist;
            }
          });
        });
      };

      const filteredProducts = applyFilters(cachedProducts);
      // Only update filters other than the current selected one
      const countOccurrences = (products: any[], getValue: (product: any) => string | undefined) => {
        const counts = new Map<string, number>();
        products.forEach((product) => {
          const value = getValue(product);
          if (value) {
            counts.set(value, (counts.get(value) || 0) + 1);
          }
        });
        return counts;
      };

      const productTypeCounts = countOccurrences(filteredProducts, (p) => p?.product_type);
      const brandCounts = countOccurrences(filteredProducts, (p) => p?.brand?.name);

      const specCounts = new Map<string, Map<string, number>>();
      filteredProducts.forEach((product) => {
        product?.specifications?.forEach((spec: any) => {
          const titleMatch = spec?.key?.replaceAll('_', ' ');
          const isAccepted = acceptedFilters.some((f) => f?.title === titleMatch);
          if (isAccepted && spec?.key && spec?.value) {
            if (!specCounts.has(spec.key)) {
              specCounts.set(spec.key, new Map());
            }
            const valueCounts = specCounts.get(spec.key)!;
            valueCounts.set(spec.value, (valueCounts.get(spec.value) || 0) + 1);
          }
        });
      });

      const filters: Filter[] = [];

      // Product Type
      const isProductTypeAccepted = acceptedFilters.some((f) => f?.title === 'Product Type');
      if (isProductTypeAccepted && productTypeCounts.size > 0) {
        filters.push({
          id: 'product_type',
          key: 'Product Type',
          options: Array.from(productTypeCounts.entries())
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count),
          __typename: 'ProductType',
        });
      }

      // Brand
      if (brandCounts.size > 0) {
        filters.push({
          id: 'brand',
          key: 'Brand',
          options: Array.from(brandCounts.entries())
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count),
          __typename: 'Brand',
        });
      }

      // Specs
      specCounts.forEach((valueCounts, key) => {
        if (filters.some((f) => f.key === key)) return;
        filters.push({
          id: key,
          key,
          options: Array.from(valueCounts.entries())
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count),
          __typename: 'Specification',
        });
      });
      // Only update filters other than the current selected one
      return filters
        .map((filter) => {
          // Skip updating the current selected filter
          if (capsAllFirstCharWithUnderScore(filter.key) !== currentSelectedKey) {
            return filter;
          }

          const existing = filterOptions.find((f) => f.key === filter.key);
          if (existing) {
            // Update option counts, preserving existing values where possible
            return {
              ...existing,
              options: existing.options.map((option) => {
                const newOption = filter.options.find((o) => o.value === option.value);
                return newOption || option;
              }),
            };
          }

          // If there's no existing filter to update, just return the original one
          return filter;
        })
        .sort((a, b) => {
          if (a.key === 'Product Type') return -1;
          if (b.key === 'Product Type') return 1;
          if (ACCEPTED_MAIN_FILTERS.includes(a.key) && !ACCEPTED_MAIN_FILTERS.includes(b.key)) return -1;
          if (!ACCEPTED_MAIN_FILTERS.includes(a.key) && ACCEPTED_MAIN_FILTERS.includes(b.key)) return 1;
          return a.key.localeCompare(b.key);
        });
    },
    [cachedCollectionData.current, productCount, selectedFilters, currentSelectedFilter]
  );

  const buildProductFilters = (searchParamsArray: string) => {
    const filters: any = {};
    const newSelected: SelectedFilter[] = [];

    searchParamsArray.split('&').forEach((param, index) => {
      const [rawKey, rawValue] = param.split('=');
      if (!rawKey || !rawValue) return;

      const key = capsAllFirstCharWithDash(rawKey);
      const value = rawValue.replaceAll('+', ' ');

      switch (rawKey) {
        case 'brand':
          filters.brand = filters.brand || {
            name: { in: [] },
          };
          filters.brand.name.in.push(value);
          newSelected.push({
            id: `${rawKey}-${index}`,
            key: key,
            value,
          });
          break;
        case 'product-type':
          filters.product_type = {
            eq: value,
          };
          newSelected.push({
            id: `${rawKey}-${index}`,
            key: key,
            value,
          });
          break;
        default:
          const formattedKey = capsAllFirstCharWithUnderScore(rawKey);
          const formattedValue = value;

          if (!filters.specifications) {
            filters.specifications = { or: [] };
          }

          filters.specifications.or.push({
            key: {
              eq: formattedKey,
            },
            value: {
              eq: formattedValue,
            },
          });

          newSelected.push({
            id: `${rawKey}-${index}`,
            key: capsAllFirstCharWithUnderScore(rawKey),
            value,
          });
          break;
      }
    });

    return {
      productFilters: filters,
      selectedFilters: newSelected,
    };
  };

  const handleSortChange = (value: string) => {
    router.push(`${pathname}?sort=${value}`, { scroll: false });
  };

  const handleFilterClick = useCallback(
    ({ key, value }: SelectedFilter) => {
      const filterKey = key.toLowerCase().replaceAll(' ', '-');
      const filterValue = value;
      const param = `${filterKey}=${filterValue}`;

      const currentFilter = { id: `${filterKey}-${Date.now()}`, key, value };
      setCurrentSelectedFilter(currentFilter);
      // dispatch(setSelectedFilters(selectedFilters.filter((f) => f.value !== value)));

      let current = searchParams.toString();
      let currentParams = searchParams
        .toString()
        .split('&')
        .map((entry) => {
          const [_, rawValue] = entry.split('=');
          return rawValue?.replaceAll('+', ' ');
        });

      // Preserve sort parameter if it exists
      const sortParam = searchParams.get('sort');
      const sortQuery = sortParam ? `sort=${sortParam}` : '';

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

      // Combine filter params with sort param
      const finalParams = [updatedParams, sortQuery].filter(Boolean).join('&');
      const url = `${pathname}?${finalParams}`;
      const { productFilters, selectedFilters } = buildProductFilters(finalParams);
      console.log(productFilters, selectedFilters);
      dispatch(setProductFilters(productFilters));
      dispatch(setSelectedFilters(selectedFilters));
      const collection = cachedCollectionData.current?.at(0);
      const productsFromCollection = collection?.products || [];
      const acceptedFilters = collection?.productFilters || [];
      const updatedFilters = extractFilters(
        productsFromCollection,
        selectedFilters,
        key.replaceAll('_', ' '),
        acceptedFilters
      );

      setFilterOptions(updatedFilters);
      router.replace(`${url}`, { scroll: false });
    },
    [searchParams, pathname, cachedCollectionData.current]
  );

  const handleRemoveFilter = useCallback(
    ({ key, value }: SelectedFilter) => {
      const filterKey = key.toLowerCase().replaceAll(' ', '-');
      const filterValue = value.replaceAll('%20', ' ');
      const target = `${filterKey}=${filterValue}`;
      setCurrentSelectedFilter(null);
      const newParams = searchParams
        .toString()
        .split('&')
        .filter((entry) => entry.replaceAll('+', ' ') !== target)
        .join('&');

      const url = `${pathname}?${newParams}`;
      const { productFilters, selectedFilters } = buildProductFilters(newParams);
      setProductFilters(productFilters);
      dispatch(setSelectedFilters(selectedFilters));
      const collection = cachedCollectionData.current?.at(0);
      const productsFromCollection = collection?.products || [];
      const acceptedFilters = collection?.productFilters || [];

      const updatedFilters = extractFilters(productsFromCollection, selectedFilters, key, acceptedFilters);
      setFilterOptions(updatedFilters);
      router.replace(`${url}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const removeAllFilters = useCallback(() => {
    const collection = cachedCollectionData.current?.at(0);
    const productsFromCollection = collection?.products || [];
    const acceptedFilters = collection?.productFilters || [];
    const { productFilters: newProductFilters, selectedFilters: newSelectedFilters } =
      buildProductFilters('/');
    const updatedFilters = extractFilters(
      productsFromCollection,
      newSelectedFilters,
      undefined,
      acceptedFilters
    );

    dispatch(setProductFilters(newProductFilters));
    dispatch(setSelectedFilters(newSelectedFilters));
    setCurrentSelectedFilter(null);
    setFilterOptions(updatedFilters);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const handleBrandClick = useCallback(
    (brand?: string) => {
      if (!brand) return;
      cachedCollectionData.current = null;
      setRevalidateCache(true);
      dispatch(
        setCollectionFilters({
          handle: {
            eq: brand,
          },
        })
      );

      router.replace(`/collections/${brand}`, { scroll: false });
    },
    [router, dispatch]
  );

  const handlePaginationNextClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page + 1));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePaginationPreviousClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page - 1));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePaginationPageClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (params.collection) {
      dispatch(
        setCollectionFilters({
          handle: {
            eq: params.collection as string,
          },
        })
      );
    }

    const collection = data?.collections.at(0);
    const productsFromCollection = collection?.products || [];
    if (data) {
      if (!cachedCollectionData.current && revalidateCache) {
        cachedCollectionData.current = data.collections;
        const acceptedFilters = collection?.productFilters || [];
        const updatedFilters = extractFilters(
          productsFromCollection,
          selectedFilters,
          currentSelectedFilter?.key,
          acceptedFilters
        );

        setFilterOptions(updatedFilters);
        setRevalidateCache(false);
      } else {
        cachedCollectionData.current = data?.collections || [];
        const acceptedFilters = collection?.productFilters || [];
        const updatedFilters = extractFilters(
          productsFromCollection,
          selectedFilters,
          currentSelectedFilter?.key,
          acceptedFilters
        );
        setFilterOptions(updatedFilters);
        setRevalidateCache(false);
      }
    }

    dispatch(setProductCount(productsFromCollection.length));
    setProducts(productsFromCollection);

    return () => {
      dispatch(setCollectionFilters({}));
      dispatch(setProductCount(0));
    };
  }, [data, revalidateCache, cachedCollectionData.current]);

  return {
    pathname,
    loading,
    products,
    productCount,
    filterOptions,
    selectedFilters,
    showMobileFilters,
    handleBrandClick,
    handleFilterClick,
    handleRemoveFilter,
    setShowMobileFilters,
    handleSortChange,
    removeAllFilters,
    handlePaginationNextClick,
    handlePaginationPreviousClick,
    handlePaginationPageClick,
  };
};

export default useProductFilter;
