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

export const WAREHOUSE_LOCATIONS = [
  {
    id: 0,
    title: 'Sydney(24/32-38 Belmore Rd, Punchbowl NSW)',
  },
  {
    id: 1,
    title: 'Melbourne(34/49 McArthurs Rd, Altona North VIC 3025)',
  },
  {
    id: 2,
    title: 'Brisbane(4/22 Spine St, Sumner QLD 4074)',
  },
];

export const DELIVERY_OPTIONS = [
  {
    id: '0',
    label: 'TNT Standard Shipping',
    price: 39.0,
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
    value: 'pick_up',
    active: false,
    icon: {
      type: 'warehouse',
      size: 10,
      className: 'w-10 h-10 mx-auto',
      strokeWidth: 1,
    },
  },
];
