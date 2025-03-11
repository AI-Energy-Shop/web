import React from 'react';
import AdminSideNavigation from '@/components/Navigations/AdminSideNavigation';
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="h-screen w-full grid grid-cols-12">
      <div className="h-full w-full col-span-2">
        <AdminSideNavigation />
      </div>
      <div className="h-full w-full col-span-10 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin">{children}</div>
      </div>
    </main>
  );
};

export default AdminLayout;
