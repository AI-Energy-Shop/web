export const USER_LEVELS = ['SMALL', 'MID-SIZED', 'VIP', 'Wholesale'];

export const LOCATIONS = [
  // State/Territory Codes
  'NSW', // New South Wales
  'VIC', // Victoria
  'QLD', // Queensland
  'SA', // South Australia
  'WA', // Western Australia
  'TAS', // Tasmania
  'NT', // Northern Territory
  'ACT', // Australian Capital Territory

  // Major City Airport Codes
  'SYD', // Sydney (New South Wales)
  'MEL', // Melbourne (Victoria)
  'BNE', // Brisbane (Queensland)
  'ADL', // Adelaide (South Australia)
  'PER', // Perth (Western Australia)
  'HBA', // Hobart (Tasmania)
  'DRW', // Darwin (Northern Territory)
  'CBR', // Canberra (Australian Capital Territory)

  // Some Additional Region Codes (as examples)
  'CNS', // Cairns (Queensland)
  'OOL', // Gold Coast (Queensland)
  'NTL', // Newcastle (New South Wales)
  'AVV', // Avalon (Victoria)
  'BNK', // Ballina Byron Bay (New South Wales)
  'MCY', // Sunshine Coast (Queensland)
  'PHE', // Port Hedland (Western Australia)
  'ALH', // Albany (Western Australia)
  'LST', // Launceston (Tasmania)
  'MKY', // Mackay (Queensland)
  'BME', // Broome (Western Australia)
  'ARM', // Armidale (New South Wales)
  'GOV', // Gove (Northern Territory)
  'KGC', // Kingscote (South Australia)
  'LDH', // Lord Howe Island (New South Wales)
  'MQL', // Mildura (Victoria)
  'PQQ', // Port Macquarie (New South Wales)
  'ABX', // Albury (New South Wales/Victoria)
  'BWT', // Burnie (Tasmania)
];

export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: 'Solar Panels',
    value: 'solar_panel',
    icon: '/images/categories/panel.png',
  },
  {
    id: 1,
    name: 'Inverters',
    value: 'inverter',
    icon: '/images/categories/inverter.png',
  },
  {
    id: 1,
    name: 'Energy Storage',
    value: 'energy_storage',
    icon: '/images/categories/panel.png',
  },
  {
    id: 1,
    name: 'EV Chargers',
    value: 'ev_charger',
    icon: '/images/categories/charger.png',
  },
  {
    id: 1,
    name: 'Electricals',
    value: 'electricals',
    icon: '/images/categories/electricals.png',
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
