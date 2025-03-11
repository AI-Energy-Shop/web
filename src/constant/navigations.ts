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
}> = [
  {
    id: 0,
    label: 'Dashboard',
    href: '/admin',
    icon: 'box',
  },
  {
    id: 1,
    label: 'Products',
    href: '/admin/products',
    icon: 'zap',
  },
  {
    id: 2,
    label: 'Orders',
    href: '/admin/orders',
    icon: 'shopping-cart',
  },
  {
    id: 3,
    label: 'Users',
    href: '/admin/users',
    icon: 'users',
  },
  {
    id: 4,
    label: 'Analytics',
    href: '/admin/analytics',
    icon: 'chart-bar',
  },
];

export const NAV_LIST_ITEMS = [
  { id: 0, href: '/', label: 'Home', icon: 'home' },
  { id: 1, href: '/products', label: 'Products', icon: 'zap' },
  { id: 2, href: '/about', label: 'About Us', icon: 'info' },
  { id: 3, href: '/contact-us', label: 'Contact Us', icon: 'mail' },
  { id: 4, href: '/downloads', label: 'Downloads', icon: 'download' },
  { id: 5, href: '/stc-trading', label: 'STC Trading', icon: 'shopping-cart' },
  { id: 6, href: '/shift-trade', label: 'Shift Trade', icon: 'shopping-cart' },
];
