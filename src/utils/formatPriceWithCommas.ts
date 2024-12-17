export function formatPriceWithCommas(amount: number): string {
  return Math.floor(amount).toLocaleString();
}
