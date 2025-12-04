export function getCardSystem(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 2) return 'unknown';

  const first6 = cleaned.substring(0, 6);
  const first4 = cleaned.substring(0, 4);
  const first3 = cleaned.substring(0, 3);
  const first2 = cleaned.substring(0, 2);
  const first1 = cleaned[0];

  // 🔹 Сначала проверяем MIR по 2200–2209
  if (/^220[0-9]/.test(first4)) {
    return 'mir';
  }

  // 🔹 Потом Visa
  if (/^4/.test(first1)) return 'visa';

  // 🔹 Потом Mastercard (51–55 или 2221–2720)
  if (/^5[1-5]/.test(first2) || /^2[2-7]/.test(first2)) return 'mastercard';

  // 🔹 American Express
  if (/^3[47]/.test(first2)) return 'amex';

  // 🔹 Discover, JCB и др. — по желанию

  return 'unknown';
}