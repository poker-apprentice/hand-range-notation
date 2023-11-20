import { InvalidHandRangeNotationError } from '~/InvalidHandRangeNotationError';
import { RangeNotation, expandRangeNotation } from './expandRangeNotation';

describe('expandRangeNotation', () => {
  it('expands pair ranges', () => {
    expect(expandRangeNotation('TT-QQ')).toEqual([
      ['Qs', 'Qh'],
      ['Qs', 'Qd'],
      ['Qs', 'Qc'],
      ['Qh', 'Qd'],
      ['Qh', 'Qc'],
      ['Qd', 'Qc'],
      ['Js', 'Jh'],
      ['Js', 'Jd'],
      ['Js', 'Jc'],
      ['Jh', 'Jd'],
      ['Jh', 'Jc'],
      ['Jd', 'Jc'],
      ['Ts', 'Th'],
      ['Ts', 'Td'],
      ['Ts', 'Tc'],
      ['Th', 'Td'],
      ['Th', 'Tc'],
      ['Td', 'Tc'],
    ]);
  });

  it('expands suitedness ranges', () => {
    expect(expandRangeNotation('K8s-KTs')).toEqual([
      ['Ks', 'Ts'],
      ['Kh', 'Th'],
      ['Kd', 'Td'],
      ['Kc', 'Tc'],
      ['Ks', '9s'],
      ['Kh', '9h'],
      ['Kd', '9d'],
      ['Kc', '9c'],
      ['Ks', '8s'],
      ['Kh', '8h'],
      ['Kd', '8d'],
      ['Kc', '8c'],
    ]);

    expect(expandRangeNotation('K9o-KTo')).toEqual([
      ['Ks', 'Th'],
      ['Ks', 'Td'],
      ['Ks', 'Tc'],
      ['Kh', 'Ts'],
      ['Kh', 'Td'],
      ['Kh', 'Tc'],
      ['Kd', 'Ts'],
      ['Kd', 'Th'],
      ['Kd', 'Tc'],
      ['Kc', 'Ts'],
      ['Kc', 'Th'],
      ['Kc', 'Td'],
      ['Ks', '9h'],
      ['Ks', '9d'],
      ['Ks', '9c'],
      ['Kh', '9s'],
      ['Kh', '9d'],
      ['Kh', '9c'],
      ['Kd', '9s'],
      ['Kd', '9h'],
      ['Kd', '9c'],
      ['Kc', '9s'],
      ['Kc', '9h'],
      ['Kc', '9d'],
    ]);
  });

  it('orders the hands by rank, then suit', () => {
    expect(expandRangeNotation('TT-QQ')).toEqual(expandRangeNotation('QQ-TT'));
    expect(expandRangeNotation('K8s-KTs')).toEqual(expandRangeNotation('KTs-K8s'));
    expect(expandRangeNotation('K9o-KTo')).toEqual(expandRangeNotation('KTo-K9o'));
    expect(expandRangeNotation('K9o-KTo')).toEqual(expandRangeNotation('9Ko-TKo'));
  });

  it.each(['AA-FF', 'KTs-K9o', 'KTo-K9s', 'KTsss-K9sss'] satisfies RangeNotation[])(
    'throws on invalid range %s',
    (notation) => {
      expect(() => expandRangeNotation(notation)).toThrow(InvalidHandRangeNotationError);
    },
  );
});
