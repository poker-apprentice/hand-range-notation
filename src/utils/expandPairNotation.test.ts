import { expandPairNotation, isPairNotation } from './expandPairNotation';

describe('isPairNotation', () => {
  it.each(['22', '33', '44', '55', '66', '77', '88', '99', 'TT', 'JJ', 'QQ', 'KK', 'AA'])(
    'accepts %s as a valid pair notation',
    (notation) => {
      expect(isPairNotation(notation)).toBe(true);
    },
  );

  it.each(['FF', 'AK', 'AAA', 'aa'])('does not accept %s as a valid pair notation', (notation) => {
    expect(isPairNotation(notation)).toBe(false);
  });
});

describe('expandPairNotation', () => {
  it('returns hands containing pairs matching the provided notation', () => {
    expect(expandPairNotation('22')).toEqual([
      ['2s', '2h'],
      ['2s', '2d'],
      ['2s', '2c'],
      ['2h', '2d'],
      ['2h', '2c'],
      ['2d', '2c'],
    ]);
  });
});
