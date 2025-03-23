export const USER_LEVELS = ['SMALL', 'MID-SIZED', 'VIP', 'Wholesale'];

export const LOCATIONS = [
  // Major City Airport Codes
  'SYD', // Sydney (New South Wales)
  'MEL', // Melbourne (Victoria)
  'BNE', // Brisbane (Queensland)
];

export const PRODUCT_CATEGORIES = [
  {
    id: 0,
    name: 'Solar Panel',
    value: 'solar_panel',
    icon: '/svg/panel.svg',
    link: '/products/solar-panel',
  },
  {
    id: 2,
    name: 'Inverter',
    value: 'inverter',
    icon: '/svg/inverter.svg',
    link: '/products/inverter',
  },
  {
    id: 3,
    name: 'Batteries',
    value: 'energy_storage',
    icon: '/svg/battery.svg',
    link: '/products/battery',
  },
  {
    id: 4,
    name: 'Mounting',
    value: 'mounting',
    icon: '/svg/mounting.svg',
    link: '/products/mounting',
  },
  {
    id: 5,
    name: 'EV Charger',
    value: 'ev_charger',
    icon: '/svg/charger.svg',
    link: '/products/charger',
  },
  {
    id: 6,
    name: 'Heat Pump',
    value: 'heat_pump',
    icon: '/svg/water-heater.svg',
    link: '/products/heat-pump',
  },
  {
    id: 7,
    name: 'Electrical',
    value: 'electrical',
    icon: '/svg/electricals.svg',
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

export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 12;
