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
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
interface ProductPaginationProps {
  currentPage: number;
  limit?: number;
  start?: number;
  pageSize: number;
  category?: string;
}

const ProductPagination = ({
  currentPage,
  limit,
  pageSize,
  category,
}: ProductPaginationProps) => {
  const token = useSelector((state: RootState) => state.me.token);
  const variables = {
    filters: {
      category: {
        contains: category,
      },
    },
  };

  const { data } = useQuery(PRODUCT_OPRATIONS.Query.products, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: category ? variables : {},
  });

  const productLength = data?.products.length || 0;
  const totalPages = Math.ceil(productLength / pageSize);

  return (
    <Pagination className="my-10">
      <PaginationContent className="p-0">
        <PaginationItem className="list-none">
          <PaginationPrevious href={`/products/#`} />
        </PaginationItem>
        {Array.from({ length: totalPages || 0 }, (_, index) => (
          <PaginationItem key={index} className="list-none">
            <PaginationLink
              isActive={currentPage === index + 1}
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
