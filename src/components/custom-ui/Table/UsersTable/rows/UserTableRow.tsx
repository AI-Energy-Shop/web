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
    const address = user?.addresses.find((address) => address?.isActive);
    router.push(
      `/admin/users/${id}?type=approved&email=${user?.email}&username=${user?.username}&userType=${user?.user_type}&businessName=${user?.business_name}&businessNumber=${user?.business_number}&street=${address?.street1}&state=${address?.state_territory}&suburb=${address?.suburb}&postalCode=${address?.zip_code}&phone=${address?.phone}`
    );
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
      <TableCell>{user?.email}</TableCell>
      <TableCell>{user?.role?.name}</TableCell>
      <TableCell>
        <Badge variant={userBadgeVariant}>{user?.account_status}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
