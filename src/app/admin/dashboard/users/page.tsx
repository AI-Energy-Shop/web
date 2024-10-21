import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ban, KeyRound, Search, User, UserPlus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUsers } from '@/app/actions/users';
import { UserType } from '@/lib/types';
import Components from '@/components';

const UserManagement = async () => {
  const users = await getUsers();

  const overviewCards = [
    {
      icon: <User />,
      title: 'Total Users',
      value: users?.data?.usersPermissionsUsers.length.toString(),
    },
    {
      icon: <KeyRound />,
      title: 'Pending',
      value: users?.data?.usersPermissionsUsers
        ?.filter?.((item: UserType) => item.account_status === 'PENDING')
        .length.toString(),
    },
    {
      icon: <UserPlus />,
      title: 'New Users (This Month)',
      value: users?.data?.usersPermissionsUsers.length,
    },
    { icon: <Ban />, title: 'Suspended Users', value: '10' },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Clients
          </h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search users" className="pl-8" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className="text-2xl">{card.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Users</CardTitle>
            <Button>Add New User</Button>
          </CardHeader>
          <CardContent>
            <Components.Tables.UsersTable
              data={users?.data?.usersPermissionsUsers}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserManagement;
