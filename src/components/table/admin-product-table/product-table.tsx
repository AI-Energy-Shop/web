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
import { deleteProducts, updateProducts } from '@/app/actions/products';
import { Toast } from '@/lib/toast';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface ProductTableProps {
  products?: ProductsQuery['products'] | null;
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
            className="w-4 h-4 accent-slate-700 "
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
          <div className="w-[40px] h-[40px] relative overflow-hidden border border-gray-300 rounded-sm m-1">
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
      size: 40,
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => {
        return (
          <div>
            <p className="text-xs font-semibold">{row.original?.brand?.name}</p>
          </div>
        );
      },
    },
    {
      size: 40,
      accessorKey: 'collections',
      header: 'Collections',
      cell: ({ row }) => {
        const collections = row.original?.collections || [];
        const collectionCount = collections.length;

        return (
          <div>
            {collectionCount > 0 && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer">
                    {collectionCount}{' '}
                    {collectionCount === 1 ? 'Collection' : 'Collections'}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Collections</h4>
                    <div className="flex flex-wrap gap-1">
                      {collections.map((collection, index) => (
                        <Badge
                          key={collection?.documentId || index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {collection?.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
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
              {formatDate(new Date(row.original?.createdAt).toISOString())}
            </p>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products || [],
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
    const tableSelectedRows = table.getFilteredSelectedRowModel().rows;

    switch (actionName) {
      case 'publish':
        const productsToPublish = tableSelectedRows.map((row) => {
          return {
            documentId: row.original?.documentId,
            data: {
              releasedAt: new Date(),
            },
          };
        });

        const publishRes = await updateProducts(
          JSON.stringify(productsToPublish)
        );

        if (publishRes.data) {
          Toast('Products published successfully', 'SUCCESS');
        }
        break;
      case 'draft':
        const productsToDraft = tableSelectedRows.map((row) => {
          return {
            documentId: row.original?.documentId,
            data: {
              releasedAt: null,
            },
          };
        });

        const draftRes = await updateProducts(JSON.stringify(productsToDraft));

        if (draftRes.data) {
          Toast('Products drafted successfully', 'SUCCESS');
        }
        break;
      case 'delete':
        const productsData = tableSelectedRows.map((row) => {
          return {
            documentId: row.original?.documentId,
            inventory: row.original?.inventory?.documentId,
            shipping: row.original?.shipping?.documentId,
            price_lists: row.original?.price_lists.map(
              (price) => price?.documentId
            ),
            specifications: row.original?.specifications.map(
              (spec) => spec?.documentId
            ),
            key_features: row.original?.key_features.map(
              (key) => key?.documentId
            ),
          };
        });
        const deleteRes = await deleteProducts(JSON.stringify(productsData));
        if (deleteRes.length > 0) {
          Toast('Products deleted successfully', 'SUCCESS');
        }
        break;
      default:
        break;
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="relative w-full h-[calc(100vh-80px)] bg-white rounded-md shadow-md flex flex-col">
        <div className="flex items-center justify-end gap-2 pt-2 px-2  rounded-t-md">
          <Dialogs.ImportCSV />
          <Link href={'/admin/products/new'}>
            <Button size="sm">Add product</Button>
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-between px-5 py-2">
          <Input
            type="text"
            placeholder="Search product name"
            className="w-1/4 h-7 text-sm placeholder:text-sm border-gray-300"
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
            <TableHeader className="sticky top-0 z-20 bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-300">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.column.getSize()}
                        className="text-xs font-bold bg-gray-100 sticky top-0 z-20"
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
              {table.getRowModel().rows.length > 0
                ? table.getRowModel().rows?.map?.((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => handleOnClick(row.original?.documentId)}
                      className="cursor-pointer hover:bg-gray-300 border-gray-300"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            colSpan={cell.column.getSize()}
                            className="py-2 px-2 text-xs"
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
                : null}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-gray-300 bg-gray-50 p-3 flex items-center justify-between rounded-b-md shadow-sm">
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
