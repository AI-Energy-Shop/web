export const USER_LEVELS = ['SMALL', 'MID-SIZED', 'VIP', 'Wholesale'];

export const LOCATIONS = [
  // Major City Airport Codes
  'SYD', // Sydney (New South Wales)
  'MEL', // Melbourne (Victoria)
  'BNE', // Brisbane (Queensland)
];

export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: 'Solar Panel',
    value: 'solar_panel',
    icon: '/images/categories/panel.png',
    link: '/products/solar-panel',
  },
  {
    id: 1,
    name: 'Inverter',
    value: 'inverter',
    icon: '/images/categories/inverter.png',
    link: '/products/inverter',
  },
  {
    id: 1,
    name: 'Energy Storage',
    value: 'energy_storage',
    icon: '/images/categories/battery.png',
    link: '/products/battery',
  },
  {
    id: 1,
    name: 'EV Charger',
    value: 'ev_charger',
    icon: '/images/categories/charger.png',
    link: '/products/charger',
  },
  {
    id: 1,
    name: 'Electrical',
    value: 'electrical',
    icon: '/images/categories/electricals.png',
    link: '/products/electrical',
  },
];

export const BRANDS = [
  { name: 'HT-SAAE', logo: '/placeholder.svg?height=32&width=120' },
  { name: 'YH SUNPRO', logo: '/placeholder.svg?height=32&width=120' },
  { name: 'DAA Solar', logo: '/placeholder.svg?height=32&width=120' },
  { name: 'JinKO', logo: '/placeholder.svg?height=32&width=120' },
];

export const FILTERS = [
  { name: 'Brand' },
  { name: 'Wattage' },
  { name: 'Colour' },
  { name: 'Key Features' },
  { name: 'Product Warranty' },
];
