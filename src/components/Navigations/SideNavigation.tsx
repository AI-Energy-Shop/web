'use client';
import { LogOut, Settings, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { NAV_LIST_ITEMS } from '@/constant';
import Icon from '../Icon';
import { usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logoutUser } from '@/app/actions/user';
import { Me } from '@/store/features/me';

const SideNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  const handleLogout = async () => {
    await logoutUser();
  };

  const renderSortSelection = () => {
    return (
      <Select>
        <SelectTrigger className="w-[80%]" defaultValue="featured">
          <SelectValue placeholder="Featured" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  const renderHamburgerButton = () => {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-5 flex items-center justify-center md:hidden"
      >
        {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
      </Button>
    );
  };

  const renderNavlist = () => {
    return (
      <nav className="h-full w-full">
        <ul className="list-none p-0 flex flex-col gap-4">
          {NAV_LIST_ITEMS.map((item, index) => {
            const active = pathname.endsWith(item.href);
            return (
              <li key={index}>
                <Link
                  href={`${item.href}`}
                  className={`flex items-center ${active ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <Icon className="mr-3" name={item.icon as any} size={20} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  const renderProfileSection = () => {
    return (
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>
              {user?.name?.first_name?.charAt(0)}
              {user?.name?.last_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white"></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between p-0">
          <Button variant="ghost" size="sm" className="p-1">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            size="sm"
            className="p-1"
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    );
  };

  const renderAuthButtons = () => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <Link
          href="/auth/login"
          className="p-1 w-full text-center font-medium bg-gray-100 dark:bg-gray-700 rounded-md"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="p-1 w-full text-center font-medium bg-gray-100 dark:bg-gray-700 rounded-md"
        >
          Register
        </Link>
      </div>
    );
  };

  useEffect(() => {
    setUser(me);
  }, [me]);

  return (
    <>
      <aside
        className={`fixed top-0 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} h-[100vh] w-[80%] p-4 pt-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col lg:hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            {renderSortSelection()}
          </div>
          {renderNavlist()}
          {user ? renderProfileSection() : renderAuthButtons()}
        </div>
      </aside>
      {renderHamburgerButton()}
    </>
  );
};

export default SideNavigation;
