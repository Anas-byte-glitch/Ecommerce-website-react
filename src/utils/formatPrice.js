// src/utils/formatPrice.js

/**
 * Format a number as Algerian Dinar
 * e.g. 125000 → "125,000 دج"
 */
export function formatPrice(amount) {
  const formatted = new Intl.NumberFormat('ar-DZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  return `${formatted} دج`
}