export function getCentsInAmount(amount: number): string {
  const decimalPart = amount % 1; // Get the decimal part of the number
  if (decimalPart !== 0) {
    // Extract cents, multiply by 100 to convert to whole cents
    const cents = Math.round(decimalPart * 100);
    return cents.toString().padStart(2, '0');
  }
  return '00'; // Return null if there are no cents
}
