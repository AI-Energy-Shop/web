'use client';
import Components from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UsersTabProps {
  tab?: string;
  appovedUsers: any[];
  customers: any[];
  pendingCustomers: any[];
  deniedUsers: any[];
}

const UsersTab = ({ tab = 'user', appovedUsers, customers, pendingCustomers, deniedUsers }: UsersTabProps) => {
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
    <Tabs defaultValue={tabValue} className="w-full" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="user">Users</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="request">Request</TabsTrigger>
        <TabsTrigger value="denied">Denied</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Components.Tables.UsersTable data={appovedUsers} />
      </TabsContent>
      <TabsContent value="customers">
        <Components.Tables.UsersTable data={customers} />
      </TabsContent>
      <TabsContent value="request">
        <Components.Tables.UsersRequestTable data={pendingCustomers} />
      </TabsContent>
      <TabsContent value="denied">
        <Components.Tables.UsersRequestTable data={deniedUsers} />
      </TabsContent>
    </Tabs>
  );
};

export default UsersTab;
