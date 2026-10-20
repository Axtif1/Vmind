/**
 * Centralized Currency Formatter for Indian Rupees (INR)
 * Standardizes formatting with the '₹' symbol and Indian comma separation (e.g. ₹1,299)
 */
export const formatPrice = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Formats raw number with Indian numbering system without currency symbol (e.g. 1,999)
export const formatNumberINR = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "";
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
};
