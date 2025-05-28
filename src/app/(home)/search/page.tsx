import { products } from '@/app/actions/products';
import ProductList from '@/components/products/product-list';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { INITIAL_PAGE } from '@/constant';
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { capsAllFirstCharWithUnderScore } from '@/utils/string';

type FilterValue = string | string[] | undefined;

interface SpecificationFilter {
  key: { eq: string };
  value: { eq: string };
}

// Define specific filter handlers for different keys
const filterHandlers = {
  brand: (value: FilterValue) => {
    if (!value) return null;
    return {
      brand: {
        name: Array.isArray(value) ? { in: value } : { contains: value },
      },
    };
  },
  product_type: (value: FilterValue) => {
    if (!value || Array.isArray(value)) return null;
    return {
      product_type: { contains: value },
    };
  },
  category: (value: FilterValue) => {
    if (!value || Array.isArray(value)) return null;
    return {
      categories: {
        title: { contains: value },
      },
    };
  },
  // Add more specific handlers as needed
} as const;

// Helper to convert search params to filter conditions
const createFilterConditions = (searchParams: {
  [key: string]: FilterValue;
}) => {
  const conditions = [];
  const searchQuery = searchParams.search as string;
  const specificationFilters: SpecificationFilter[] = [];

  // Handle search query separately
  if (searchQuery) {
    conditions.push({
      or: [
        { name: { contains: searchQuery } },
        { model: { contains: searchQuery } },
        { product_type: { contains: searchQuery } },
      ],
    });
  }

  // Handle all other parameters
  Object.entries(searchParams).forEach(([key, value]) => {
    // Skip pagination and search params
    if (key === 'page' || key === 'pageSize' || key === 'search' || !value) {
      return;
    }

    // Convert kebab-case to snake_case for API
    const apiKey = key.replace(/-/g, '_');

    // Check if we have a specific handler for this key
    if (key in filterHandlers) {
      const handler = filterHandlers[key as keyof typeof filterHandlers];
      const result = handler(value);
      if (result) {
        conditions.push(result);
      }
    } else {
      // Handle specifications with key-value pairs
      if (Array.isArray(value)) {
        // For array values, create a filter for each value
        value.forEach((val) => {
          specificationFilters.push({
            key: { eq: capsAllFirstCharWithUnderScore(apiKey) },
            value: { eq: val },
          });
        });
      } else {
        specificationFilters.push({
          key: { eq: capsAllFirstCharWithUnderScore(apiKey) },
          value: { eq: value },
        });
      }
    }
  });

  // Add specifications filter if we have any
  if (specificationFilters.length > 0) {
    conditions.push({
      specifications: {
        or: specificationFilters,
      },
    });
  }

  return conditions;
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SearchResults = async ({ searchParams }: SearchPageProps) => {
  const searchParamsRes = await searchParams;
  const page = Number(searchParamsRes.page) || INITIAL_PAGE;
  const pageSize = Number(searchParamsRes.pageSize) || INITIAL_PAGE_SIZE;

  const filterConditions = createFilterConditions(searchParamsRes);

  const { data } = await products({
    filters: filterConditions.length > 0 ? { and: filterConditions } : {},
    pagination: {
      page,
      pageSize,
    },
  });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ProductList data={data?.products} page={page} pageSize={pageSize} />
    </Suspense>
  );
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  return (
    <div className="w-full min-h-screen">
      <SearchResults searchParams={searchParams} />
    </div>
  );
};

export default SearchPage;
