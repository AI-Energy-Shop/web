import React from 'react';
import { getUsers } from '@/app/actions/user';
import UsersTab from '@/components/tabs/users-tab';
import { Ban, KeyRound, User, UserPlus, Users2 } from 'lucide-react';

interface AdminUsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const tab = searchParams.tab as string;
  const data = await getUsers();

  const overviewCards = [
    {
      icon: <User />,
      title: 'Total Users',
      value: data?.usersPermissionsUsers.length.toString(),
    },
    {
      icon: <KeyRound />,
      title: 'Pending',
      value: data?.usersPermissionsUsers
        ?.filter?.((item) => item?.account_status === 'PENDING')
        .length.toString(),
    },
    {
      icon: <UserPlus />,
      title: 'New Users (This Month)',
      value: data?.usersPermissionsUsers.length,
    },
    { icon: <Ban />, title: 'Suspended Users', value: '10' },
  ];

  const appovedUsers = data?.usersPermissionsUsers.filter(
    (user) => user?.account_status === 'APPROVED'
  );

  const customers = data?.usersPermissionsUsers.filter(
    (user) => user?.role?.name === 'CUSTOMER'
  );

  const pendingCustomers = data?.usersPermissionsUsers.filter((user) => {
    return (
      (user?.role === null && user?.account_status === 'PENDING') ||
      user?.account_status === 'REVIEWING'
    );
  });

  const deniedUsers = data?.usersPermissionsUsers.filter(
    (user) => user?.account_status === 'DENIED'
  );

  return (
    <main className="w-full h-auto p-5">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <header className="w-full mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5" />
              <h1 className="font-semibold">Users</h1>
            </div>
          </div>
        </header>

        <div className="w-full h-full">
          <UsersTab
            tab={tab}
            appovedUsers={appovedUsers || []}
            customers={customers || []}
            pendingCustomers={pendingCustomers || []}
            deniedUsers={deniedUsers || []}
          />
        </div>
      </div>
    </main>
  );
}
