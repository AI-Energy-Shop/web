'use client';
import React from 'react';
import useProductFilter from '@/hooks/useProductFilter';
import * as PaginationUI from '@/components/ui/pagination';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
interface ProductPaginationProps {
  page?: number;
  pageSize?: number;
}
const ProductPagination: React.FC<ProductPaginationProps> = ({
  page,
  pageSize,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loading, productCount } = useProductFilter();
  const pageSizeValue = pageSize || INITIAL_PAGE_SIZE;

  const totalPages = Math.ceil(productCount / Number(pageSizeValue));

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

  if (!page || productCount < pageSizeValue) {
    return null;
  }

  return (
    <PaginationUI.Pagination
      className={cn(`my-10 ${loading ? 'opacity-50' : 'opacity-100'}`)}
    >
      <PaginationUI.PaginationContent className="p-0">
        {page !== 1 && (
          <PaginationUI.PaginationItem className="list-none">
            {/* Go to first page */}
            <PaginationUI.PaginationPrevious
              size="icon"
              className="cursor-pointer select-none"
              onClick={() => handlePaginationPreviousClick(page)}
            />
          </PaginationUI.PaginationItem>
        )}
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
        {page !== totalPages && (
          <PaginationUI.PaginationItem className="list-none">
            {/* Go to last page */}
            <PaginationUI.PaginationNext
              size="icon"
              className="cursor-pointer select-none"
              onClick={() => handlePaginationNextClick(page)}
            />
          </PaginationUI.PaginationItem>
        )}
      </PaginationUI.PaginationContent>
    </PaginationUI.Pagination>
  );
};

export default ProductPagination;
