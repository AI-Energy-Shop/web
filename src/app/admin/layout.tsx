import Navigations from '@/components/Navigations';
import React from 'react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Navigations.SideNavigation />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </main>
  );
};

export default AdminLayout;
