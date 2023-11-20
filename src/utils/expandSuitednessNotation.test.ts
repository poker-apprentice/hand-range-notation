import { expandSuitednessNotation, isSuitednessNotation } from './expandSuitednessNotation';

describe('isSuitednessNotation', () => {
  it.each([
    'A2s',
    'A3s',
    'A4s',
    'A5s',
    'A6s',
    'A7s',
    'A8s',
    'A9s',
    'ATs',
    'AJs',
    'AQs',
    'AKs',
    'A2o',
    'A3o',
    'A4o',
    'A5o',
    'A6o',
    'A7o',
    'A8o',
    'A9o',
    'ATo',
    'AJo',
    'AQo',
    'AKo',
  ])('accepts %s as a valid suitedness notation', (notation) => {
    expect(isSuitednessNotation(notation)).toBe(true);
  });

  it.each(['AAs', 'AA', 'AK', 'aas', 'Aas'])(
    'does not accept %s as a valid suitedness notation',
    (notation) => {
      expect(isSuitednessNotation(notation)).toBe(false);
    },
  );
});

describe('expandSuitednessNotation', () => {
  it('returns hands containing suited cards matching the provided notation', () => {
    expect(expandSuitednessNotation('A2s')).toEqual([
      ['As', '2s'],
      ['Ah', '2h'],
      ['Ad', '2d'],
      ['Ac', '2c'],
    ]);
  });
});
