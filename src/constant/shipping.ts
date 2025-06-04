export type ShippingOptions = {
  id: number;
  title: string;
  value: string;
  active: boolean;
  icon: {
    type: any;
    size: number;
    className: string;
    strokeWidth: number;
  };
}[];

export const SHIPPING_FEE = 39.5;
export const CARD_FEE = 39.25;

// dont change the id of each warehouse location because it match the same id in odoo
export const WAREHOUSE_LOCATIONS = [
  {
    id: 1,
    title: 'Sydney(24/32-38 Belmore Rd, Punchbowl NSW)',
    name: 'sydney',
    address: {
      city: 'Sydney',
      unit: '24/32-38',
      street: 'Belmore Rd',
      suburb: 'Punchbowl',
      state: 'NSW',
      postcode: '2196',
    },
  },
  {
    id: 2,
    title: 'Melbourne(34/49 McArthurs Rd, Altona North VIC 3025)',
    name: 'melbourne',
    address: {
      city: 'Melbourne',
      unit: '34/49',
      street: 'McArthurs Rd',
      suburb: 'Altona North',
      state: 'VIC',
      postcode: '3025',
    },
  },
  {
    id: 3,
    title: 'Brisbane(4/22 Spine St, Sumner QLD 4074)',
    name: 'brisbane',
    address: {
      city: 'Brisbane',
      unit: '4/22',
      street: 'Spine St',
      suburb: 'Sumner',
      state: 'QLD',
      postcode: '4074',
    },
  },
];

export const DELIVERY_OPTIONS = [
  {
    id: '0',
    label: 'TNT Standard Shipping',
    price: 39.47,
    eta: '3-5  Business days',
    prefix: '$',
  },
  {
    id: '1',
    label: 'TNT Express Shipping',
    price: 73.47,
    eta: '1-2 Business days',
    prefix: '$',
  },
  {
    id: '2',
    label: 'Hi-Trans High Priority Next Day Shipping',
    price: 90.01,
    eta: '1 Business days',
    prefix: '$',
  },
];

const now = new Date();

export const PICK_UP_ESTIMATED_ARRIVAL_TIME = [
  {
    id: 0,
    value: '7:30am - 9:00am',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 30),
  },
  {
    id: 1,
    value: '9:00am - 11:00am',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
  },
  {
    id: 2,
    value: '11:00am - 1:00pm',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
  },
  {
    id: 3,
    value: '1:00pm - 3:00pm',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
  },
  {
    id: 4,
    value: '3:00pm - 5:00pm',
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
  },
];

export const SHIPPING_DETAILS = [
  {
    id: 0,
    active: false,
    title: 'Fake Company Installs',
    address: {
      street: '123 Example Street',
      suburb: 'Sydney',
      state_territory: 'NSW',
      postcode: '2000',
      country: 'Australia',
    },
    user: {
      firstName: 'Frank',
      lastName: 'Grimes',
      email: '',
      phone: '0444 044 454',
    },
  },
  {
    id: 1,
    active: true,
    title: 'Fake Company Retailers',
    address: {
      street: '123 Example Street',
      suburb: 'ASD',
      state_territory: 'MEL',
      postcode: '1234',
      country: 'Australia',
    },
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      phone: '0444 044 454',
    },
  },
];

export const SHIPPING_OPTIONS: ShippingOptions = [
  {
    id: 0,
    title: 'Delivery',
    value: 'delivery',
    active: true,
    icon: {
      type: 'truck',
      size: 10,
      className: 'w-10 h-10 mx-auto',
      strokeWidth: 1,
    },
  },
  {
    id: 1,
    title: 'Pick Up',
    value: 'pickup',
    active: false,
    icon: {
      type: 'building',
      size: 10,
      className: 'w-10 h-10 mx-auto',
      strokeWidth: 1,
    },
  },
];
