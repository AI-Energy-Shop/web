export const formatAUD = (amount: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount);
};

export const statsData = [
  {
    title: 'Sessions',
    value: '337,842',
    percentageChange: 20,
  },
  {
    title: 'Total sales',
    value: formatAUD(2341632.3),
    percentageChange: 45,
  },
  {
    title: 'Orders',
    value: '1,656',
    percentageChange: 38,
  },
  {
    title: 'Conversion rate',
    value: '0.47%',
    percentageChange: 16,
  },
] as const;
