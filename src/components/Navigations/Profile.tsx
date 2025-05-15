'use client';
import React from 'react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Settings } from 'lucide-react';
import { Me } from '@/store/features/me';

interface ProfileProps {
  user?: Me;
  onLogout: () => void;
}

const Profile = ({ user, onLogout }: ProfileProps) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Avatar>
          {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" /> */}
          <AvatarFallback>
            {user?.account_detail?.name?.first_name?.charAt(0)}
            {user?.account_detail?.name?.last_name?.charAt(0)}
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
          onClick={onLogout}
          type="button"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
