import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Ban, KeyRound, Search, User, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const UserManagement = () => {
  const overviewCards = [
    { icon: <User />, title: 'Total Users', value: '1,000' },
    { icon: <KeyRound />, title: 'Active Users', value: '850' },
    { icon: <UserPlus />, title: 'New Users (This Month)', value: '50' },
    { icon: <Ban />, title: 'Suspended Users', value: '10' },
  ];

  const recentUsers = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      lastLogin: '2023-05-15 14:30',
      status: 'active',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'User',
      lastLogin: '2023-05-14 09:15',
      status: 'active',
    },
    {
      name: 'Carol White',
      email: 'carol@example.com',
      role: 'Manager',
      lastLogin: '2023-05-13 16:45',
      status: 'inactive',
    },
    {
      name: 'David Brown',
      email: 'david@example.com',
      role: 'User',
      lastLogin: '2023-05-12 11:20',
      status: 'suspended',
    },
    {
      name: 'Eva Green',
      email: 'eva@example.com',
      role: 'User',
      lastLogin: '2023-05-11 13:55',
      status: 'active',
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            User Management
          </h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search users" className="pl-8" />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === 'active'
                            ? 'default'
                            : user.status === 'inactive'
                              ? 'outline'
                              : 'destructive'
                        }
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserManagement;
