export function getCardSystem(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, "");
  if (cleaned.length < 2) return "unknown";

  const first1 = cleaned.substring(0, 4);
  const first2 = cleaned.substring(0, 2);
  const first3 = cleaned[0];

  if (/^220[0-9]/.test(first1)) {
    return "mir";
  }

  if (/^4/.test(first3)) {
    return "visa";
  }

  if (/^5[1-5]/.test(first2) || /^2[2-7]/.test(first2)) {
    return "mastercard";
  }

  if (/^3[47]/.test(first2)) {
    return "amex";
  }

  return "unknown";
}
