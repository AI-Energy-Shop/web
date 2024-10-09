import Navigations from "@/components/Navigations";
import React from "react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="w-full h-screen grid grid-cols-12 grid-rows-12">
      <div className="col-span-2 row-span-12">
        <Navigations.SideNavigation />
      </div>
      {/* {children} */}
    </main>
  );
};

export default AdminLayout;
