export const DELIVERY_OPTIONS = [
  {
    id: 0,
    label: 'TNT Standard Shipping',
    price: 39.0,
    eta: '3-5  Business days',
    prefix: '$',
  },
  {
    id: 1,
    label: 'TNT Express Shipping',
    price: 73.47,
    eta: '1-2 Business days',
    prefix: '$',
  },
  {
    id: 2,
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
      suburb: 'MEL',
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
