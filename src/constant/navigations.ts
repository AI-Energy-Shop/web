import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const SIDE_NAVIGATIONS: Array<{
  id: number;
  href: string;
  label: string;
  icon: IconProps['name'];
}> = [
  {
    id: 0,
    label: 'Dashboard',
    href: 'dashboard',
    icon: 'box',
  },
  {
    id: 1,
    label: 'Products',
    href: 'dashboard/products',
    icon: 'zap',
  },
  {
    id: 2,
    label: 'Orders',
    href: 'dashboard/orders',
    icon: 'shopping-cart',
  },
  {
    id: 3,
    label: 'Users',
    href: 'dashboard/users',
    icon: 'users',
  },
  {
    id: 4,
    label: 'Analytics',
    href: 'dashboard/analytics',
    icon: 'chart-bar',
  },
];