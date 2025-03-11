'use client';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

const UserRequestTableRow = ({ user }: { user: any }) => {
  console.log(user);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const id = e.currentTarget.getAttribute('data-id');
    router.push(
      `/admin/users/${id}?type=request&email=${user?.email}&username=${user?.username}&userType=${user?.user_type}&businessName=${user?.business_name}&businessNumber=${user?.business_number}&street=${user?.address?.street}&state=${user?.address?.state_territory}&suburb=${user?.address?.suburb}&postalCode=${user?.address?.postcode}&phone=${user?.phone}`
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
