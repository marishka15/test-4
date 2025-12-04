import { luhnCheck } from '../src/js/cardValidator';

describe('Luhn algorithm', () => {
  test('valid Visa number passes', () => {
  expect(luhnCheck('4532342856781237')).toBe(true);
});

test('invalid Visa number fails', () => {
  expect(luhnCheck('4532342856781234')).toBe(false); 
});
});