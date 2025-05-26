import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';
import React from 'react';
import UserRequestTableRow from './rows/UserRequestTableRow';
import { UsersPermissionsUsersQuery } from '@/lib/gql/graphql';

interface UserRequestTableProps {
  data?: UsersPermissionsUsersQuery['usersPermissionsUsers'];
}
const UsersRequestTable: React.FC<UserRequestTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Business Name</TableHead>
          <TableHead>Business Number</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map?.((user) => {
          return <UserRequestTableRow key={user?.documentId} user={user} />;
        })}
      </TableBody>
    </Table>
  );
};

export default UsersRequestTable;
