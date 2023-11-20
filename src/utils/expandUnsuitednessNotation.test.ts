import { expandUnsuitednessNotation, isUnsuitednessNotation } from './expandUnsuitednessNotation';

describe('isUnsuitednessNotation', () => {
  it.each(['A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'AT', 'AJ', 'AQ', 'AK'])(
    'accepts %s as a valid unsuitedness notation',
    (notation) => {
      expect(isUnsuitednessNotation(notation)).toBe(true);
    },
  );

  it.each(['AA', 'AF', 'aa', 'Aa'])(
    'does not accept %s as a valid unsuitedness notation',
    (notation) => {
      expect(isUnsuitednessNotation(notation)).toBe(false);
    },
  );
});

describe('expandUnsuitednessNotation', () => {
  it('returns hands containing suited cards matching the provided notation', () => {
    expect(expandUnsuitednessNotation('A2')).toEqual([
      ['As', '2s'],
      ['As', '2h'],
      ['As', '2d'],
      ['As', '2c'],
      ['Ah', '2s'],
      ['Ah', '2h'],
      ['Ah', '2d'],
      ['Ah', '2c'],
      ['Ad', '2s'],
      ['Ad', '2h'],
      ['Ad', '2d'],
      ['Ad', '2c'],
      ['Ac', '2s'],
      ['Ac', '2h'],
      ['Ac', '2d'],
      ['Ac', '2c'],
    ]);
  });
});
