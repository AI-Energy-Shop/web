'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import COLLECTION_OPERATION from '@/graphql/collections';
import { capsAllFirstCharWithDash, capsAllFirstCharWithUnderScore } from '@/utils/string';
import {
  CollectionsWithProductsQuery,
  CollectionsWithProductsQueryVariables,
  ProductFiltersInput,
  ProductsQuery,
} from '@/lib/gql/graphql';
import { ACCEPTED_MAIN_FILTERS } from '@/constant/product';
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

  const [filterOptions, setFilterOptions] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [collectionFilters, setCollectionFilters] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [productFilters, setProductFilters] = useState<ProductFiltersInput>({});
  const cachedCollectionData = useRef<CollectionsWithProductsQuery['collections'] | null>(null);
  const [products, setProducts] = useState<ProductsQuery['products']>([]);

  const [currentSelectedFilter, setCurrentSelectedFilter] = useState<SelectedFilter | null>(null);

  const { loading } = useQuery<CollectionsWithProductsQuery, CollectionsWithProductsQueryVariables>(
    COLLECTION_OPERATION.Query.collectionsWithProducts,
    {
      variables: {
        collectionsFilters: collectionFilters,
        productsFilters: productFilters,
        productsPagination: {},
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {
        const collection = data.collections[0];
        const productsFromCollection = collection?.products || [];

        if (cachedCollectionData.current === null) {
          cachedCollectionData.current = data.collections;
          const collection = data.collections.at(0);
          const productsFromCollection = collection?.products || [];
          const acceptedFilters = collection?.productFilters || [];

          const updatedFilters = extractFilters(
            productsFromCollection,
            selectedFilters,
            currentSelectedFilter?.key,
            acceptedFilters
          );

          console.log('updatedFilters USE_EFFECT');

          // Direct state update instead of modifying previous state
          setFilterOptions(updatedFilters);
        }

        setProducts(productsFromCollection);
        setProductCount(productsFromCollection?.length || 0);
      },
    }
  );

  const extractFilters = (
    cachedProducts: any[],
    selectedFilters: SelectedFilter[],
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
  };

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
              in: [formattedValue],
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
      setSelectedFilters((prev) => {
        const exists = prev.some((f) => f.value === value);
        if (exists) {
          return prev.filter((f) => f.value !== value);
        }
        return [...prev, currentFilter];
      });

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
      setProductFilters(productFilters);
      setSelectedFilters(selectedFilters);
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
      router.push(`${url}`, { scroll: false });
    },
    [searchParams, pathname, cachedCollectionData.current]
  );

  const handleRemoveFilter = useCallback(
    ({ key, value }: SelectedFilter) => {
      const filterKey = key.toLowerCase().replaceAll(' ', '-');
      const filterValue = value.replaceAll('%20', ' ');
      const target = `${filterKey}=${filterValue}`;

      setSelectedFilters((prev) => prev.filter((f) => f.value !== value));
      setCurrentSelectedFilter(null);
      const newParams = searchParams
        .toString()
        .split('&')
        .filter((entry) => entry.replaceAll('+', ' ') !== target)
        .join('&');

      const url = `${pathname}?${newParams}`;
      const { productFilters, selectedFilters } = buildProductFilters(newParams);
      setProductFilters(productFilters);
      setSelectedFilters(selectedFilters);
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
    setSelectedFilters([]);
    setCurrentSelectedFilter(null);
    const { productFilters, selectedFilters } = buildProductFilters('/');
    setProductFilters(productFilters);
    setSelectedFilters(selectedFilters);
    const collection = cachedCollectionData.current?.at(0);
    const productsFromCollection = collection?.products || [];
    const acceptedFilters = collection?.productFilters || [];

    const updatedFilters = extractFilters(
      productsFromCollection,
      selectedFilters,
      undefined,
      acceptedFilters
    );
    setFilterOptions(updatedFilters);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const handleBrandClick = (brand?: string) => {
    if (!brand) return;
    router.push(`/collections/${brand}`, { scroll: false });
  };

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

  return {
    pathname,
    loading,
    products,
    productCount,
    filterOptions,
    selectedFilters,
    showMobileFilters,
    handleFilterClick,
    handleRemoveFilter,
    setShowMobileFilters,
    handleSortChange,
    handleBrandClick,
    removeAllFilters,
  };
};

export default useProductFilter;
