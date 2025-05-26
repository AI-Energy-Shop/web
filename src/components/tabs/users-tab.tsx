'use client';
import Tables from '@/components/table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UsersTabProps {
  tab?: string;
  appovedUsers: any[];
  customers: any[];
  pendingCustomers: any[];
  deniedUsers: any[];
}

const UsersTab = ({
  tab = 'user',
  appovedUsers,
  customers,
  pendingCustomers,
  deniedUsers,
}: UsersTabProps) => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(tab);
  const handleTabChange = (value: string) => {
    router.push(`/admin/users?tab=${value}`);
  };

  useEffect(() => {
    if (tab) {
      setTabValue(tab);
    }
  }, [tab]);

  return (
    <div className="bg-white rounded-lg p-5">
      <Tabs
        defaultValue={tabValue}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="user">Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="denied">Denied</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Tables.UsersTable data={appovedUsers} />
        </TabsContent>
        <TabsContent value="customers">
          <Tables.UsersTable data={customers} />
        </TabsContent>
        <TabsContent value="request">
          <Tables.UsersRequestTable data={pendingCustomers} />
        </TabsContent>
        <TabsContent value="denied">
          <Tables.UsersRequestTable data={deniedUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersTab;
