import { InvalidHandError } from './errors/InvalidHandError';
import { expandNotation } from './expandNotation';
import { notate } from './notate';

describe('notate', () => {
  it('notates pairs of any suit', () => {
    expect(notate(expandNotation('AA-99'))).toEqual('99+');
    expect(notate(expandNotation('TT-66'))).toEqual('TT-66');
    expect(notate(expandNotation('TT,88-66'))).toEqual('TT,88-66');
  });

  it('notates suited hands', () => {
    expect(notate(expandNotation('AKs-ATs'))).toEqual('ATs+');
    expect(notate(expandNotation('AKs,AJs-ATs'))).toEqual('AKs,AJs-ATs');
    expect(notate(expandNotation('TKs-QKs'))).toEqual('KQs-KTs');
  });

  it('notates unsuited hands', () => {
    expect(notate(expandNotation('AKo-ATo'))).toEqual('ATo+');
    expect(notate(expandNotation('AKo,AJo-ATo'))).toEqual('AKo,AJo-ATo');
    expect(notate(expandNotation('TKo-QKo'))).toEqual('KQo-KTo');
  });

  it('notates specific hands', () => {
    expect(notate(expandNotation('AhTd,AcQh'))).toEqual('AcQh,AhTd');
  });

  it('orders notations by pairs, suited, unsuited, specific hands, and highest to lowest within each grouping', () => {
    expect(notate(expandNotation('7d2c,3h2s,KQo,AQo,AKo,ATs+,TT+,A2s-A5s'))).toEqual(
      'TT+,ATs+,A5s-A2s,AQo+,KQo,7d2c,3h2s',
    );
  });

  it('throws on hands not containing 2 cards', () => {
    expect(() => notate([['Ac', 'Kc', 'Qc']])).toThrow(InvalidHandError);
    expect(() => notate([['Ac']])).toThrow(InvalidHandError);
  });
});
