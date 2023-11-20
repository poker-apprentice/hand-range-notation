import { normalizeNotation } from './normalizeNotation';

describe('normalizeNotation', () => {
  it('converts the provided notation into a predictable format', () => {
    expect(normalizeNotation('AKs,TT,QAo,AA')).toEqual('AA,TT,AKs,AQo');
  });
});
