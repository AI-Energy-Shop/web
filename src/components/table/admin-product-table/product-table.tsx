'use client';
import React, { Suspense, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ProductQuery, ProductsQuery } from '@/lib/gql/graphql';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { getProductStatus } from '@/utils/product';
import { formatDate } from '@/utils/formatDate';
import { Checkbox } from '@/components/ui/checkbox';
import Dialogs from '@/components/dialog';
import Buttons from '@/components/buttons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';
import { ON_SELECT_PRODUCT_ACTIONS } from '@/constant/product';
import { deleteProducts } from '@/app/actions/products';
import { Toast } from '@/lib/toast';

interface ProductTableProps {
  products: ProductsQuery['products'];
}

const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<ProductQuery['product']>[] = [
    {
      accessorKey: 'input',
      header: (row) => (
        <div className="w-[40px] h-[40px] flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-[40px] h-[40px] flex items-center justify-center">
          <Input
            type="checkbox"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              row.toggleSelected(!!e.target.checked);
            }}
            aria-label="Select row"
            className="w-4 h-4 accent-slate-700"
          />
        </div>
      ),
    },
    {
      size: 20,
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const firstImage = row.original?.images?.at(0);
        const defatultImage = '/no-product-image.jpg';
        return (
          <div className="w-[40px] h-[40px] relative overflow-hidden border rounded-sm m-1">
            <Image
              width={50}
              height={50}
              priority
              alt={firstImage?.alternativeText || ''}
              className="absolute object-contain w-full h-full"
              src={firstImage?.url || defatultImage}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
      minSize: 200,
      maxSize: 200,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold">{row.original?.name}</p>
          </div>
        );
      },
    },
    {
      size: 40,
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusInfo = getProductStatus(row.original?.releasedAt);
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}
          >
            {statusInfo.status}
          </span>
        );
      },
    },
    {
      size: 40,
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        return (
          <div>
            <p className="text-xs font-semibold">
              {row.original?.product_type}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      size: 40,
      cell: ({ row }) => {
        return (
          <div>
            <p className="text-xs">
              {formatDate(new Date(row.original?.createdAt))}
            </p>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns: columns,
    defaultColumn: {
      size: 20, //starting column size
      minSize: 20, //enforced during column resizing
      maxSize: 350, //enforced during column resizing
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const handleOnClick = (documentId?: string) => {
    if (documentId) {
      router.push(`/admin/products/${documentId}`);
    }
  };

  const handleBulkAction = async (actionName: string) => {
    switch (actionName) {
      case 'publish':
        console.log('publish');
        break;
      case 'draft':
        console.log('draft');
        break;
      case 'delete':
        const tableSelectedRows = table.getFilteredSelectedRowModel().rows;
        const documentIds = tableSelectedRows.map((row) => {
          return {
            documentId: row.original?.documentId,
          };
        });
        const res = await deleteProducts(JSON.stringify(documentIds));
        if (res.length > 0) {
          Toast('Products deleted successfully', 'SUCCESS');
        }
        break;
      default:
        break;
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="relative w-full h-[calc(100vh-80px)] bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col">
        <div className="flex items-center justify-end gap-2 pt-2 px-2  dark:bg-gray-900 rounded-t-md">
          <Dialogs.ImportCSV />
          <Link href={'/admin/products/new'}>
            <Button size="sm">Add product</Button>
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-between px-5 py-2">
          <Input
            type="text"
            placeholder="Search product name"
            className="w-1/4 h-7 text-sm placeholder:text-sm"
            onChange={(e) => {
              table.setGlobalFilter(e.target.value);
            }}
          />
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="border text-xs">
                Bulk edit
              </Button>
              <Buttons.PopoverButton
                triggerComponent={
                  <Button size="icon" variant="ghost">
                    <Ellipsis />
                  </Button>
                }
                contentClassName="w-40 p-0"
              >
                <div className="flex flex-col gap1">
                  {ON_SELECT_PRODUCT_ACTIONS.map((action) => (
                    <Dialogs.ProductBulkAction
                      key={action.actionId}
                      actionId={action.actionId}
                      actionName={action.actionName}
                      actionDescription={action.actionDescription}
                      onSubmit={(actionName) => handleBulkAction(actionName)}
                      selectedRows={table.getFilteredSelectedRowModel().rows}
                      submitButtonText={action.submitButtonText}
                      submitButtonVariant={action.submitButtonVariant}
                    />
                  ))}
                </div>
              </Buttons.PopoverButton>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <Table className="w-full table-fixed">
            <TableHeader className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.column.getSize()}
                        className="text-xs font-bold bg-gray-100 dark:bg-gray-900 sticky top-0 z-20"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows?.map?.((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => handleOnClick(row.original?.documentId)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          colSpan={cell.column.getSize()}
                          className="py-2 px-2 text-xs border-b border-gray-100 dark:border-gray-800"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    NO AVAILABLE DATA
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="border-t bg-gray-50 dark:bg-gray-900 p-3 flex items-center justify-between rounded-b-md shadow-sm">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProductsTable;
