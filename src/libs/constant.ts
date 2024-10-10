import { LinkItem } from './types';

export const NAV_LINKS: LinkItem[] = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/about',
    title: 'About Us',
  },
  {
    url: '/contact-us',
    title: 'Contact Us',
  },
  {
    url: '/downloads',
    title: 'Downloads',
  },
  {
    url: '/stc-trading',
    title: 'STC Trading',
  },
  {
    url: '/shift-trade',
    title: 'Shift Trade',
  },
];

export const FOOTER_ACCORDION_DATA = [
  {
    id: 1,
    title: 'Our Company',
    content: ['About Us', 'Contact Us'],
  },
  {
    id: 2,
    title: 'Resources',
    content: ['Downloads', 'Shift Trade', 'STC Trading'],
  },
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
