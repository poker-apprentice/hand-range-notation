import { expandSuitednessPlusNotation } from './expandSuitednessPlusNotation';

describe('expandSuitednessPlusNotation', () => {
  it('returns hands containing suited cards that are at least as strong as the provided notation', () => {
    expect(expandSuitednessPlusNotation('A2s')).toEqual([
      ['As', 'Ks'],
      ['Ah', 'Kh'],
      ['Ad', 'Kd'],
      ['Ac', 'Kc'],
      ['As', 'Qs'],
      ['Ah', 'Qh'],
      ['Ad', 'Qd'],
      ['Ac', 'Qc'],
      ['As', 'Js'],
      ['Ah', 'Jh'],
      ['Ad', 'Jd'],
      ['Ac', 'Jc'],
      ['As', 'Ts'],
      ['Ah', 'Th'],
      ['Ad', 'Td'],
      ['Ac', 'Tc'],
      ['As', '9s'],
      ['Ah', '9h'],
      ['Ad', '9d'],
      ['Ac', '9c'],
      ['As', '8s'],
      ['Ah', '8h'],
      ['Ad', '8d'],
      ['Ac', '8c'],
      ['As', '7s'],
      ['Ah', '7h'],
      ['Ad', '7d'],
      ['Ac', '7c'],
      ['As', '6s'],
      ['Ah', '6h'],
      ['Ad', '6d'],
      ['Ac', '6c'],
      ['As', '5s'],
      ['Ah', '5h'],
      ['Ad', '5d'],
      ['Ac', '5c'],
      ['As', '4s'],
      ['Ah', '4h'],
      ['Ad', '4d'],
      ['Ac', '4c'],
      ['As', '3s'],
      ['Ah', '3h'],
      ['Ad', '3d'],
      ['Ac', '3c'],
      ['As', '2s'],
      ['Ah', '2h'],
      ['Ad', '2d'],
      ['Ac', '2c'],
    ]);
  });
});