'use client';
import React from 'react';
import useProductFilter from '@/hooks/useProductFilter';
import * as PaginationUI from '@/components/ui/pagination';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface ProductPaginationProps {
  page?: number;
  pageSize?: number;
}
const ProductPagination: React.FC<ProductPaginationProps> = ({ page, pageSize }) => {
  const {
    loading,
    productCount,
    handlePaginationPreviousClick,
    handlePaginationNextClick,
    handlePaginationPageClick,
  } = useProductFilter();
  const pageSizeValue = pageSize || INITIAL_PAGE_SIZE;

  const totalPages = Math.ceil(productCount / Number(pageSizeValue));

  if (!page || productCount < pageSizeValue) {
    return null;
  }

  return (
    <PaginationUI.Pagination className={cn(`my-10 ${loading ? 'opacity-50' : 'opacity-100'}`)}>
      <PaginationUI.PaginationContent className="p-0">
        <PaginationUI.PaginationItem className="list-none">
          {/* Go to first page */}
          <PaginationUI.PaginationPrevious
            className="cursor-pointer select-none"
            onClick={() => handlePaginationPreviousClick(page)}
          />
        </PaginationUI.PaginationItem>
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationUI.PaginationItem key={index} className="list-none">
              <Button
                variant="ghost"
                className={cn(` w-10 h-10 ${page === index + 1 && 'border'}`)}
                onClick={() => handlePaginationPageClick(index + 1)}
              >
                {index + 1}
              </Button>
            </PaginationUI.PaginationItem>
          ))}
        <PaginationUI.PaginationItem className="list-none">
          {/* Go to last page */}
          <PaginationUI.PaginationNext
            className="cursor-pointer select-none"
            onClick={() => handlePaginationNextClick(page)}
          />
        </PaginationUI.PaginationItem>
      </PaginationUI.PaginationContent>
    </PaginationUI.Pagination>
  );
};

export default ProductPagination;
