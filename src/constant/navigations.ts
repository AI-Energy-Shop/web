import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const ADMIN_SIDE_NAVIGATIONS: Array<{
  id: number;
  href: string;
  label: string;
  icon: IconProps['name'];
  enabled: boolean;
}> = [
  {
    id: 0,
    label: 'Home',
    href: '/admin',
    icon: 'box',
    enabled: true,
  },
  {
    id: 1,
    label: 'Orders',
    href: '/admin/orders',
    icon: 'shopping-cart',
    enabled: true,
  },
  {
    id: 2,
    label: 'Products',
    href: '/admin/products',
    icon: 'package-search',
    enabled: true,
  },
  {
    id: 3,
    label: 'Users',
    href: '/admin/users',
    icon: 'users',
    enabled: true,
  },
  {
    id: 4,
    label: 'Finance',
    href: '/admin/finance',
    icon: 'dollar-sign',
    enabled: false,
  },
  {
    id: 5,
    label: 'Analytics',
    href: '/admin/analytics',
    icon: 'chart-bar',
    enabled: false,
  },
  {
    id: 6,
    label: 'Marketing',
    href: '/admin/marketing',
    icon: 'mail',
    enabled: false,
  },
  {
    id: 7,
    label: 'Discounts',
    href: '/admin/discounts',
    icon: 'percent',
    enabled: false,
  },
];

export const NAV_LIST_ITEMS = [
  { id: 0, href: '/', label: 'Home', icon: 'home', enabled: true },
  {
    id: 1,
    href: '/collections/all',
    label: 'Products',
    icon: 'zap',
    enabled: true,
  },
  { id: 2, href: '/about', label: 'About Us', icon: 'info', enabled: true },
  {
    id: 3,
    href: '/contact-us',
    label: 'Contact Us',
    icon: 'mail',
    enabled: true,
  },
  {
    id: 4,
    href: '/downloads',
    label: 'Downloads',
    icon: 'download',
    enabled: true,
  },
  {
    id: 5,
    href: '/stc-trading',
    label: 'STC Trading',
    icon: 'shopping-cart',
    enabled: true,
  },
  {
    id: 6,
    href: '/shift-trade',
    label: 'Shift Trade',
    icon: 'shopping-cart',
    enabled: true,
  },
];
