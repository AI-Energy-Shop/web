import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';
import React from 'react';
import UserTableRow from './rows/UserTableRow';
import { UsersPermissionsUsersQuery } from '@/lib/gql/graphql';

interface UserTableProps {
  data?: UsersPermissionsUsersQuery['usersPermissionsUsers'];
}
const UsersTable: React.FC<UserTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map?.((user) => {
          return <UserTableRow key={user?.documentId} user={user} />;
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
