"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { UserType } from '@/lib/types';
import React from 'react'
import UserTableRow from './UserTableRow';
import Link from 'next/link';

interface UserTableProps {
  data?: UserType[]
}
const UsersTable: React.FC<UserTableProps> = ({data}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map?.((user: UserType) => {
          return(
            <UserTableRow key={user.documentId} user={user} />
          );
        })}
      </TableBody>
    </Table>
  )
}

export default UsersTable