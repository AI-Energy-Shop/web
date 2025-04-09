'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useQuery } from '@apollo/client';
import PRODUCT_OPRATIONS from '@/graphql/products';
import { ProductsQuery } from '@/lib/gql/graphql';
import { useSearchParams, useParams, usePathname } from 'next/navigation';
import {
  EXCLUDED_SEARCH_PARAMS,
  INITIAL_PAGE,
  INITIAL_PAGE_SIZE,
} from '@/constant';

interface ProductPaginationProps {}

const ProductPagination: React.FC<ProductPaginationProps> = (props) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const page = Number(searchParams.get('page')) || INITIAL_PAGE;
  const pageSize = Number(searchParams.get('pageSize')) || INITIAL_PAGE_SIZE;
  const pathname = usePathname();

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

  const { data, loading } = useQuery<ProductsQuery>(
    PRODUCT_OPRATIONS.Query.products,
    {
      variables: {
        filters: filters(),
      },
    }
  );
  const productLength = data?.products?.length || 0;
  const totalPages = Math.ceil(productLength / pageSize);

  if (loading) {
    return null;
  }

  return (
    <Pagination className="my-10">
      <PaginationContent className="p-0">
        <PaginationItem className="list-none">
          {/* Go to first page */}
          <PaginationPrevious
            href={`${pathname}?page=${1}&pageSize=${pageSize}`}
          />
        </PaginationItem>
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index} className="list-none">
              <PaginationLink
                isActive={page === index + 1}
                href={`${pathname}?page=${index + 1}&pageSize=${pageSize}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem className="list-none">
          {/* Go to last page */}
          <PaginationNext
            href={`${pathname}?page=${totalPages}&pageSize=${pageSize}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
