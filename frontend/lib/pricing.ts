export function formatPriceInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: amount < 100 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
