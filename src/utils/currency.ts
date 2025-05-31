export const formatCurrency = (value?: number | null, currency?: string) => {
  if (!value) return '0.00';
  if (value === 0) return '0.00';
  if (value === null) return '0.00';
  if (value === undefined) return '0.00';
  return value?.toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
