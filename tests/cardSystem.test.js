import { getCardSystem } from '../src/js/cardSystem';

describe('Card system detection', () => {
  test('detects Visa', () => {
    expect(getCardSystem('4532342856781234')).toBe('visa');
  });

  test('unknown system', () => {
    expect(getCardSystem('1111111111111111')).toBe('unknown');
  });
});

test('detects Mastercard', () => {
  expect(getCardSystem('5555555555554444')).toBe('mastercard'); // ✅
});

test('detects MIR', () => {
  expect(getCardSystem('2200123456789012')).toBe('mir'); // ✅
});