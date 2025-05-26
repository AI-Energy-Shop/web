'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { UsersPermissionsUsersQuery } from '@/lib/gql/graphql';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface UserTableProps {
  data?: UsersPermissionsUsersQuery['usersPermissionsUsers'];
}

const UsersTable: React.FC<UserTableProps> = ({ data }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns: ColumnDef<
    UsersPermissionsUsersQuery['usersPermissionsUsers'][number]
  >[] = [
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
    // {
    //   accessorKey: 'avatar',
    //   header: 'Avatar',
    //   cell: ({ row }) => (
    //     <div>
    //       <Avatar>
    //         <AvatarImage />
    //         <AvatarFallback>
    //           {row.original?.email?.charAt(0) || ''}
    //         </AvatarFallback>
    //       </Avatar>
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div>{row.original?.email}</div>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <div>{row.original?.role?.name}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.account_status;
        const isApproved = row.original?.account_status === 'APPROVED';
        return (
          <div>
            <Badge
              variant={isApproved ? 'default' : 'secondary'}
              className={cn(isApproved ? 'bg-green-500' : 'bg-red-500')}
            >
              {status}
            </Badge>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
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

  return (
    <Table>
      <TableHeader>
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
              onClick={() => {}}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    colSpan={cell.column.getSize()}
                    className="py-2 px-2 text-xs border-b border-gray-100 dark:border-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default UsersTable;
