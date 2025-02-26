export function capitalizeFirstChar(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAllFirstChar(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.split(' ').map(capitalizeFirstChar).join(' ');
}
