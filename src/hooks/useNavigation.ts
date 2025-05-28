'use client';
import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return {
    pathname,
    pathSegments,
  };
};

export default useNavigation;
