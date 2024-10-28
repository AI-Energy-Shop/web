'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { UsersPermissionsUsersQuery } from '@/lib/gql/graphql';
import { useRouter } from 'next/navigation';

const UserTableRow = ({
  user,
}: {
  user: UsersPermissionsUsersQuery['usersPermissionsUsers'][0];
}) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/admin/dashboard/users/${id}`);
  };

  return (
    <TableRow
      className="cursor-pointer"
      key={user?.documentId}
      onClick={() => handleClick(user!.documentId)}
    >
      <TableCell className="font-medium">
        {user?.account_details?.first_name} {user?.account_details?.last_name}
      </TableCell>
      <TableCell>{user?.email}</TableCell>
      <TableCell>{user?.account_details?.level}</TableCell>
      <TableCell>{'today'}</TableCell>
      <TableCell>{user?.account_status}</TableCell>
    </TableRow>
  );
};

export default UserTableRow;
