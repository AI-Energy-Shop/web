import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const NavSearchBar = () => {
  return (
    <div className="border border-gray-300 rounded-md flex items-center justify-center relative w-50 px-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default NavSearchBar;
