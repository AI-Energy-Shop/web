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
import { useSearchParams } from 'next/navigation';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constant';

interface ProductPaginationProps {
  category?: string;
}

const ProductPagination = ({ category }: ProductPaginationProps) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || INITIAL_PAGE;
  const pageSize = Number(searchParams.get('pageSize')) || INITIAL_PAGE_SIZE;

  const variables = {
    filters: {
      categories: {
        slug: {
          contains: category,
        },
      },
    },
  };

  const { data, loading } = useQuery<ProductsQuery>(
    PRODUCT_OPRATIONS.Query.products,
    {
      variables: category ? variables : {},
    }
  );

  if (loading) {
    return null;
  }

  const productLength = data?.products?.length || 0;
  const totalPages = Math.ceil(productLength / pageSize);

  return (
    <Pagination className="my-10">
      <PaginationContent className="p-0">
        <PaginationItem className="list-none">
          <PaginationPrevious href={`/products/#`} />
        </PaginationItem>
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index} className="list-none">
              <PaginationLink
                isActive={page === index + 1}
                href={`/products?page=${index + 1}&pageSize=${pageSize}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem className="list-none">
          <PaginationNext href={`/products/#`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
