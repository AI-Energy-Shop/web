import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export type SideNavigation = {
  id: number;
  href: string;
  label: string;
  icon: IconProps['name'];
  active: boolean;
}


export const SIDE_NAVIGATIONS: Array<SideNavigation> = [
  {
    id: 0,
    label: 'Dashboard',
    href: '/admin/dashboard/',
    icon: 'box',
    active: true
  },
  {
    id: 1,
    label: 'Products',
    href: '/admin/dashboard/products',
    icon: 'zap',
    active: false
  },
  {
    id: 2,
    label: 'Orders',
    href: '/admin/dashboard/orders',
    icon: 'shopping-cart',
    active: false
  },
  {
    id: 3,
    label: 'Users',
    href: '/admin/dashboard/users',
    icon: 'users',
    active: false
  },
  {
    id: 4,
    label: 'Analytics',
    href: '/admin/dashboard/analytics',
    icon: 'chart-bar',
    active: false
  },
];
