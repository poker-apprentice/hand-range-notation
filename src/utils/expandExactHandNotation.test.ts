import { expandExactHandNotation, isExactHandNotation } from './expandExactHandNotation';

describe('isExactHandNotation', () => {
  it.each(['2s2d', 'Ah3h', 'JsQd'])('accepts %s as a valid pair notation', (notation) => {
    expect(isExactHandNotation(notation)).toBe(true);
  });

  it.each(['FsFd', 'AdAd', 'AcAdAh', 'acad'])(
    'does not accept %s as a valid pair notation',
    (notation) => {
      expect(isExactHandNotation(notation)).toBe(false);
    },
  );
});

describe('expandExactHandNotation', () => {
  it('returns hands containing pairs matching the provided notation', () => {
    expect(expandExactHandNotation('AsAd')).toEqual(['As', 'Ad']);
  });

  it('orders the cards by rank, then suit', () => {
    expect(expandExactHandNotation('JcQc')).toEqual(['Qc', 'Jc']);
    expect(expandExactHandNotation('QcQd')).toEqual(['Qd', 'Qc']);
  });
});
