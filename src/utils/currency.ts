export const formatCurrency = (value?: number, currency?: string) => {
  if (!value) return '0.00';
  return value?.toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
