import React from "react";

const SideNavigation = () => {
  return (
    <nav className="w-full h-full border">
      <div className="w-full h-auto p-5">Logo</div>

      <ul className="w-full h-full">
        <li className="w-full h-auto p-5 border-black">Dashboard</li>
        <li className="w-full h-auto p-5 border-black">Products</li>
        <li className="w-full h-auto p-5 border-black">Users</li>
        <li className="w-full h-auto p-5 border-black">Orders</li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
