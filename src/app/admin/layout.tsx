import React from 'react';
import SideNavigation from '@/components/Navigations/side-naviation';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="h-screen w-full grid grid-cols-12">
      <div className="h-full w-full col-span-2">
        <SideNavigation />
      </div>
      <div className="h-full w-full col-span-10 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin">{children}</div>
      </div>
    </main>
  );
};

export default AdminLayout;
