import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ban, KeyRound, Search, User, UserPlus } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import { getUsers } from '@/app/actions/user';
import UsersTab from '@/components/custom-ui/Tabs/UsersTab';

interface AdminUsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
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
      value: data?.usersPermissionsUsers?.filter?.((item) => item?.account_status === 'PENDING').length.toString(),
    },
    {
      icon: <UserPlus />,
      title: 'New Users (This Month)',
      value: data?.usersPermissionsUsers.length,
    },
    { icon: <Ban />, title: 'Suspended Users', value: '10' },
  ];

  const appovedUsers = data?.usersPermissionsUsers.filter((user) => user?.account_status === 'APPROVED');

  const customers = data?.usersPermissionsUsers.filter((user) => user?.role?.name === 'CUSTOMER');

  const pendingCustomers = data?.usersPermissionsUsers.filter((user) => {
    return (user?.role === null && user?.account_status === 'PENDING') || user?.account_status === 'REVIEWING';
  });

  const deniedUsers = data?.usersPermissionsUsers.filter((user) => user?.account_status === 'DENIED');

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search users" className="pl-8" />
          </div>
        </div>
      </header>

      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className="text-2xl">{card.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0"></CardHeader>
          <CardContent>
            <UsersTab
              tab={tab}
              appovedUsers={appovedUsers || []}
              customers={customers || []}
              pendingCustomers={pendingCustomers || []}
              deniedUsers={deniedUsers || []}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
