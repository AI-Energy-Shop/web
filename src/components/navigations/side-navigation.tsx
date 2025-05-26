'use client';
import { X, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
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
import { logoutUser } from '@/app/actions/user';
import { cn } from '@/lib/utils';
import WarehouseIconButton from './warehouse-icon';
import UserIconButton from './user-icon';
interface SideNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const pathname = usePathname();

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
        className="fixed top-6 left-5 flex items-center justify-center lg:hidden"
      >
        {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
      </Button>
    );
  };

  const renderNavlist = () => {
    return (
      <nav className="h-full w-full">
        <ul className="list-none p-0 m-0 flex flex-col">
          {NAV_LIST_ITEMS.map((item, index) => {
            const active = pathname.endsWith(item.href);
            return (
              <li key={index}>
                <Link
                  href={`${item.href}`}
                  className={cn(
                    'text-xs font-semibold text-black',
                    'p-2',
                    'transition-all duration-200',
                    'hover:bg-gray-400',
                    `flex items-center ${active ? 'bg-gray-400' : ''}`
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
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

  return (
    <aside
      className={cn(
        'z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'fixed top-0 left-0 h-[100vh] w-[80%]',
        ' bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col lg:hidden',
        'transition-transform duration-300 ease-in-out'
      )}
    >
      <div className="h-full">
        <div className="w-full flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-2">
            <UserIconButton />
            <WarehouseIconButton />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-10 w-10" width={50} height={50} />
          </Button>
        </div>
        <div className="w-full">{renderNavlist()}</div>
      </div>
    </aside>
  );
};

export default SideNavigation;
