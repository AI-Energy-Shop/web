'use client';

import { Badge } from '@/components/ui/badge';
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

  const userBadgeVariant =
    user?.account_status === 'APPROVED'
      ? 'default'
      : user?.account_status === 'DENIED'
        ? 'destructive'
        : 'secondary';

  return (
    <TableRow
      className="cursor-pointer"
      key={user?.documentId}
      onClick={() => handleClick(user!.documentId)}
    >
      <TableCell className="font-medium">
        {user?.account_detail?.first_name} {user?.account_detail?.last_name}
      </TableCell>
      <TableCell>{user?.email}</TableCell>
      <TableCell>{user?.account_detail?.level}</TableCell>
      <TableCell>{'today'}</TableCell>
      <TableCell>
        <Badge variant={userBadgeVariant}>{user?.account_status}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
