'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { UsersPermissionsUsersQuery } from '@/lib/gql/graphql';
import { useRouter } from 'next/navigation';

const UserRequestTableRow = ({
  user,
}: {
  user: UsersPermissionsUsersQuery['usersPermissionsUsers'][0];
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    const address = user?.addresses.find((address: any) => address?.isActive);
    router.push(
      `/admin/users/${id}?type=request&email=${user?.email}&username=${user?.username}&businessType=${user?.business_type}&businessName=${user?.business_name}&businessNumber=${user?.business_number}&street1=${address?.street1}&street2=${address?.street2}&state=${address?.state}&city=${address?.city}&zipCode=${address?.zip_code}&country=${address?.country}&phone=${user?.phone}`
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
      onClick={handleClick}
      data-id={user?.documentId}
    >
      <TableCell className="font-semibold">{user?.email}</TableCell>
      <TableCell>{user?.username}</TableCell>
      <TableCell>{user?.business_name}</TableCell>
      <TableCell>{user?.business_number}</TableCell>
      <TableCell>
        <Badge variant={userBadgeVariant}>{user?.account_status}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default UserRequestTableRow;
