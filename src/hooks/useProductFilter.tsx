'use client';

import { useQuery } from '@apollo/client';
import COLLECTION_OPERATION from '@/graphql/collections';
import { ACCEPTED_MAIN_FILTERS } from '@/constant/product';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  capsAllFirstCharWithDash,
  capsAllFirstCharWithUnderScore,
} from '@/utils/string';
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
  setRevalidateCache,
  setSelectedFilters,
  setCurrentSelectedFilter,
} from '@/store/features/products';
import { PAGINATION_SEARCH_PARAMS } from '@/constant/navigations';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productCount = useAppSelector((state) => state.products.productCount);
  const revalidateCache = useAppSelector(
    (state) => state.products.revalidateCache
  );
  const selectedFilters = useAppSelector(
    (state) => state.products.selectedFilters
  );
  const productFilters = useAppSelector(
    (state) => state.products.productFilters
  );
  const collectionFilters = useAppSelector(
    (state) => state.products.collectionFilters
  );
  const currentSelectedFilter = useAppSelector(
    (state) => state.products.currentSelectedFilter
  );

  const [filterOptions, setFilterOptions] = useState<Filter[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState<ProductsQuery['products']>([]);

  const cachedCollectionData = useRef<
    CollectionsWithProductsQuery['collections'] | null
  >(null);

  const { loading, data } = useQuery<
    CollectionsWithProductsQuery,
    CollectionsWithProductsQueryVariables
  >(COLLECTION_OPERATION.Query.collectionsWithProducts, {
    variables: {
      collectionsFilters: collectionFilters || { handle: { eq: 'all' } },
      productsFilters: productFilters,
      productsPagination: {},
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const extractFilters = useCallback(
    (
      cachedProducts: any[],
      selectedFilters: SelectedFilter[],
      currentSelectedKey?: string,
      acceptedFilters: any[] = []
    ): Filter[] => {
      const applyFilters = (products: ProductsQuery['products']) => {
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
          // For each group of filters, check if the product matches the conditions
          return Object.entries(groupedFilters).every(([key, filters]) => {
            switch (key) {
              case 'Product Type':
                // For Product Type, match if the product matches ANY of the selected types
                return filters.some(
                  (filter) => product?.product_type === filter.value
                );
              case 'Brand':
                // For Brand, match if the product matches ANY of the selected brands
                return filters.some(
                  (filter) => product?.brand?.name === filter.value
                );
              default:
                // For specifications, match if ANY of the specifications match
                return filters.some((filter) =>
                  product?.specifications?.some(
                    (spec: any) =>
                      capsAllFirstCharWithUnderScore(spec.key) === filter.key &&
                      spec?.value === filter.value
                  )
                );
            }
          });
        });
      };

      const filteredProducts = applyFilters(cachedProducts);

      // Only update filters other than the current selected one
      const countOccurrences = (
        products: any[],
        getValue: (product: any) => string | undefined
      ) => {
        const counts = new Map<string, number>();
        products.forEach((product) => {
          const value = getValue(product);
          if (value) {
            counts.set(value, (counts.get(value) || 0) + 1);
          }
        });
        return counts;
      };

      const productTypeCounts = countOccurrences(
        filteredProducts,
        (p) => p?.product_type
      );
      const brandCounts = countOccurrences(
        filteredProducts,
        (p) => p?.brand?.name
      );

      const specCounts = new Map<string, Map<string, number>>();
      filteredProducts.forEach((product) => {
        product?.specifications?.forEach((spec: any) => {
          const keyMatch = spec?.key?.replaceAll('_', ' ');
          const isAccepted = acceptedFilters.some((f) => f?.title === keyMatch);
          if (isAccepted && keyMatch && spec?.value) {
            if (!specCounts.has(keyMatch)) {
              specCounts.set(keyMatch, new Map());
            }
            const valueCounts = specCounts.get(keyMatch)!;
            valueCounts.set(spec.value, (valueCounts.get(spec.value) || 0) + 1);
          }
        });
      });

      const filters: Filter[] = [];

      // Product Type
      const isProductTypeAccepted = acceptedFilters.some(
        (f) => f?.title === 'Product Type'
      );
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

      const newFilters = filters
        .map((filter) => {
          if (filter.key !== currentSelectedKey) {
            return filter;
          }

          const existing = filterOptions.find((f) => f.key === filter.key);

          if (existing) {
            // Update option counts, preserving existing values where possible
            return {
              ...existing,
              options: existing.options.map((option) => {
                const newOption = filter.options.find(
                  (o) => o.value === option.value
                );
                return newOption || option;
              }),
            };
          }
          return filter;
        })
        .filter((filter) => filter !== null)
        .sort((a, b) => {
          if (a.key === 'Product Type') return -1;
          if (b.key === 'Product Type') return 1;
          if (
            ACCEPTED_MAIN_FILTERS.includes(a.key) &&
            !ACCEPTED_MAIN_FILTERS.includes(b.key)
          )
            return -1;
          if (
            !ACCEPTED_MAIN_FILTERS.includes(a.key) &&
            ACCEPTED_MAIN_FILTERS.includes(b.key)
          )
            return 1;
          return a.key.localeCompare(b.key);
        });

      return newFilters;
    },
    [
      cachedCollectionData.current,
      productCount,
      selectedFilters,
      currentSelectedFilter,
    ]
  );

  const buildProductFilters = (searchParamsArray: string) => {
    const filters: any = {};
    const newSelected: SelectedFilter[] = [];

    searchParamsArray.split('&').forEach((param, index) => {
      const [rawKey, rawValue] = param.split('=');
      if (!rawKey || !rawValue || rawKey === 'search') return;

      const formattedKey = capsAllFirstCharWithDash(rawKey);
      const formattedValue = rawValue.replaceAll('+', ' ');

      switch (rawKey) {
        case 'brand':
          filters.brand = filters.brand || {
            name: { in: [] },
          };
          filters.brand.name.in.push(formattedValue);
          newSelected.push({
            id: `${rawKey}-${index}`,
            key: formattedKey,
            value: formattedValue,
          });
          break;
        case 'product-type':
          // Initialize product_type filter with 'in' operator if it doesn't exist
          if (!filters.product_type) {
            filters.product_type = { in: [] };
          }
          // Add the value to the array
          filters.product_type.in.push(formattedValue);
          newSelected.push({
            id: `${rawKey}-${index}`,
            key: formattedKey,
            value: formattedValue,
          });
          break;
        default:
          const formattedSpecKey = capsAllFirstCharWithDash(rawKey);
          const formattedSpecValue = formattedValue;

          if (!filters.specifications) {
            filters.specifications = { or: [] };
          }

          filters.specifications.or.push({
            key: {
              eq: formattedSpecKey,
            },
            value: {
              eq: formattedSpecValue,
            },
          });

          newSelected.push({
            id: `${rawKey}-${index}`,
            key: formattedSpecKey,
            value: formattedSpecValue,
          });
          break;
      }
    });

    return {
      productFilters: filters,
      selectedFilters: newSelected,
    };
  };

  const buildSearchFilter = (searchQuery: string | null) => {
    if (!searchQuery) return {};

    return {
      or: [
        { name: { contains: searchQuery } },
        { product_type: { contains: searchQuery } },
        { brand: { name: { contains: searchQuery } } },
        {
          categories: {
            title: { contains: searchQuery },
          },
        },
      ],
    };
  };

  const handleSortChange = (value: string) => {
    // router.push(`${pathname}?sort=${value}`, { scroll: false });
  };

  const handleFilterClick = useCallback(
    ({ key, value }: SelectedFilter) => {
      if (loading) return;
      const filterKey = key
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('_', '-');
      const filterValue = value;
      const searchParam = `${filterKey}=${filterValue}`;

      const currentFilter = { id: `${filterKey}-${Date.now()}`, key, value };
      dispatch(setCurrentSelectedFilter(currentFilter));

      // Get current params and filter out pagination parameters
      let current = searchParams.toString();
      const currentParams = searchParams
        .toString()
        .split('&')
        .filter((entry) => {
          const [key, _] = entry.split('=');
          // Filter out pagination parameters (page, limit, etc.)
          return !PAGINATION_SEARCH_PARAMS.includes(`${key}`);
        })
        .map((entry) => {
          const [_, rawValue] = entry.split('=');
          return rawValue?.replaceAll('+', ' ');
        });

      const updatedParams = currentParams.includes(filterValue)
        ? current
            .split('&')
            .filter((entry) => {
              const [key, rawValue] = entry.split('=');
              // Skip pagination parameters
              if (PAGINATION_SEARCH_PARAMS.includes(key)) return false;
              if (rawValue && rawValue.replaceAll('+', ' ') == filterValue) {
                return false;
              }
              return true;
            })
            .join('&')
        : [
            ...current.split('&').filter((entry) => {
              const [key] = entry.split('=');
              return !PAGINATION_SEARCH_PARAMS.includes(key);
            }),
            searchParam,
          ].join('&');

      const finalParams = [updatedParams].filter(Boolean).join('&');
      const url = `${pathname}?${finalParams}`;
      router.replace(`${url}`, { scroll: false });

      const {
        productFilters: newProductFilters,
        selectedFilters: newSelectedFilters,
      } = buildProductFilters(finalParams);
      dispatch(setProductFilters(newProductFilters));
      dispatch(setSelectedFilters(newSelectedFilters));
    },
    [searchParams, pathname, cachedCollectionData.current]
  );

  const handleRemoveFilter = useCallback(
    ({ key, value }: SelectedFilter) => {
      const filterKey = key.toLowerCase().replaceAll(' ', '-');
      const filterValue = value.replaceAll('%20', ' ');
      const target = `${filterKey}=${filterValue}`;
      dispatch(setCurrentSelectedFilter(null));

      const newParams = searchParams
        .toString()
        .split('&')
        .filter((entry) => {
          const [rawKey, rawValue] = entry.split('=');
          // Skip pagination parameters
          if (PAGINATION_SEARCH_PARAMS.includes(rawKey)) return false;

          const formattedKey = rawKey.replaceAll('+', ' ');
          const formattedValue = rawValue?.replaceAll('+', ' ');
          const formattedTarget = `${formattedKey}=${formattedValue}`;
          if (formattedTarget !== target) {
            return true;
          }
          return false;
        })
        .join('&');

      const url = `${pathname}?${newParams}`;
      router.replace(`${url}`, { scroll: false });

      const { productFilters, selectedFilters } =
        buildProductFilters(newParams);
      dispatch(setProductFilters(productFilters));
      dispatch(setSelectedFilters(selectedFilters));
    },
    [searchParams, pathname, router]
  );

  const removeAllFilters = useCallback(() => {
    // Get the search parameter if it exists
    const searchParam = searchParams.get('search');

    // If search param exists, keep only the search parameter, otherwise empty string
    const remainingParams = searchParam ? `search=${searchParam}` : '';

    const {
      productFilters: newProductFilters,
      selectedFilters: newSelectedFilters,
    } = buildProductFilters(remainingParams);

    dispatch(setProductFilters(newProductFilters));
    dispatch(setSelectedFilters(newSelectedFilters));
    dispatch(
      setCollectionFilters({ handle: { eq: params.collection as string } })
    );
    dispatch(setCurrentSelectedFilter(null));

    // Preserve the search parameter in the URL if it exists
    const newUrl = searchParam ? `${pathname}?${remainingParams}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleBrandClick = useCallback(
    (brand?: string) => {
      if (!brand && loading) return;
      cachedCollectionData.current = null;
      dispatch(setRevalidateCache(true));
      dispatch(setCurrentSelectedFilter(null));
      dispatch(setSelectedFilters([]));
      dispatch(setProductFilters({}));

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

  const handleCategoryClick = useCallback(
    (category: string) => {
      if (!category && loading) return;
      cachedCollectionData.current = null;
      dispatch(setCurrentSelectedFilter(null));
      dispatch(setRevalidateCache(true));
      dispatch(setSelectedFilters([]));
      dispatch(setProductFilters({}));

      dispatch(
        setCollectionFilters({
          handle: {
            eq: category,
          },
        })
      );

      router.replace(`/collections/${category}`, { scroll: false });
    },
    [dispatch, router]
  );

  useEffect(() => {
    // Get search query from URL
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      dispatch(setProductFilters(buildSearchFilter(searchQuery)));
    }
  }, [searchParams]);

  useEffect(() => {
    if (params.collection) {
      dispatch(
        setCollectionFilters({
          handle: {
            eq: params.collection,
          },
        })
      );
    }

    const collection = data?.collections.at(0);
    const acceptedFilters = collection?.productFilters || [];
    const productsFromCollection = collection?.products || [];
    if (data) {
      if (!cachedCollectionData.current && revalidateCache) {
        cachedCollectionData.current = data.collections;
        const updatedFilters = extractFilters(
          productsFromCollection,
          selectedFilters,
          currentSelectedFilter?.key,
          acceptedFilters
        );

        setFilterOptions(updatedFilters);
        dispatch(setRevalidateCache(false));
      } else {
        cachedCollectionData.current = data?.collections || [];
        const updatedFilters = extractFilters(
          productsFromCollection,
          selectedFilters,
          currentSelectedFilter?.key.replaceAll('_', ' '),
          acceptedFilters
        );
        setFilterOptions(updatedFilters);
        dispatch(setRevalidateCache(false));
      }
    }

    setProducts(productsFromCollection);
    dispatch(setProductCount(productsFromCollection.length));

    return () => {
      dispatch(setCollectionFilters({}));
      dispatch(setProductCount(0));
    };
  }, [data, revalidateCache, cachedCollectionData.current]);

  return {
    data,
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
    handleCategoryClick,
  };
};

export default useProductFilter;
