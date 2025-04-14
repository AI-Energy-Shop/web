/**
 * Capitalizes the first character of a string.
 * @param str - The input string to capitalize
 * @returns The string with its first character capitalized, or empty string if input is empty
 */
export function capitalizeFirstChar(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first character of each word in a space-separated string.
 * @param str - The input string to capitalize
 * @returns The string with first character of each word capitalized, or empty string if input is empty
 */

export function capitalizeAllFirstChar(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.split(' ').map(capitalizeFirstChar).join(' ');
}

/**
 * Capitalizes the first character of each word in a dash-separated string and joins with spaces.
 * @param str - The input string with dash-separated words
 * @returns The string with first character of each word capitalized and words joined by spaces, or empty string if input is empty
 */
export function capsAllFirstCharWithDash(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.split('-').map(capitalizeFirstChar).join(' ');
}
export function capsAllFirstCharWithUnderScore(str: string) {
  if (!str) return ''; // Handle empty strings
  return str.split('_').map(capitalizeFirstChar).join(' ');
}
