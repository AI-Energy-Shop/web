import {
  BarChart,
  Box,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const SideNavigation = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex-1">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Product Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
          >
            <Box className="mr-3" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ShoppingCart className="mr-3" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="mr-3" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BarChart className="mr-3" />
            Analytics
          </Link>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              john@example.com
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;
