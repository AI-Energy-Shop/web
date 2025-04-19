'use client';
import React from 'react';
import useProductFilter from '@/hooks/useProductFilter';
import * as PaginationUI from '@/components/ui/pagination';
import { INITIAL_PAGE_SIZE } from '@/constant';

interface ProductPaginationProps {
  page?: number;
  dataCount?: number;
  pageSize?: number;
}
const ProductPagination: React.FC<ProductPaginationProps> = ({ page, pageSize }) => {
  const { collectionLoading, productCount, pathname } = useProductFilter();

  const pageSizeValue = pageSize || INITIAL_PAGE_SIZE;

  const totalPages = Math.ceil(productCount / Number(pageSizeValue));

  if (collectionLoading) {
    return null;
  }

  return (
    <PaginationUI.Pagination className="my-10">
      <PaginationUI.PaginationContent className="p-0">
        <PaginationUI.PaginationItem className="list-none">
          {/* Go to first page */}
          <PaginationUI.PaginationPrevious href={`${pathname}?page=${1}&pageSize=${Number(pageSizeValue)}`} />
        </PaginationUI.PaginationItem>
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationUI.PaginationItem key={index} className="list-none">
              <PaginationUI.PaginationLink
                isActive={page === index + 1}
                href={`${pathname}?page=${index + 1}&pageSize=${Number(pageSizeValue)}`}
              >
                {index + 1}
              </PaginationUI.PaginationLink>
            </PaginationUI.PaginationItem>
          ))}
        <PaginationUI.PaginationItem className="list-none">
          {/* Go to last page */}
          <PaginationUI.PaginationNext href={`${pathname}?page=${totalPages}&pageSize=${Number(pageSizeValue)}`} />
        </PaginationUI.PaginationItem>
      </PaginationUI.PaginationContent>
    </PaginationUI.Pagination>
  );
};

export default ProductPagination;
