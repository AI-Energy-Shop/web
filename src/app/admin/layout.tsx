import Navigations from '@/components/Navigations';
import React from 'react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto h-full">
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
