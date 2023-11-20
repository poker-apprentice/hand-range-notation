import { InvalidHandError } from './errors/InvalidHandError';
import { expandNotation } from './expandNotation';
import { notate } from './notate';

describe('notate', () => {
  it('notates pairs of any suit', () => {
    expect(notate(expandNotation('TT-66'))).toEqual('TT,99,88,77,66');
    expect(notate(expandNotation('TT,88-66'))).toEqual('TT,88,77,66');
  });

  it('notates suited hands', () => {
    expect(notate(expandNotation('AKs-ATs'))).toEqual('AKs,AQs,AJs,ATs');
    expect(notate(expandNotation('AKs,AJs-ATs'))).toEqual('AKs,AJs,ATs');
    expect(notate(expandNotation('TKs-QKs'))).toEqual('KQs,KJs,KTs');
  });

  it('notates unsuited hands', () => {
    expect(notate(expandNotation('AKo-ATo'))).toEqual('AKo,AQo,AJo,ATo');
    expect(notate(expandNotation('AKo,AJo-ATo'))).toEqual('AKo,AJo,ATo');
    expect(notate(expandNotation('TKo-QKo'))).toEqual('KQo,KJo,KTo');
  });

  it('notates specific hands', () => {
    expect(notate(expandNotation('AhTd,AcQh'))).toEqual('AcQh,AhTd');
  });

  it('throws on hands not containing 2 cards', () => {
    expect(() => notate([['Ac', 'Kc', 'Qc']])).toThrow(InvalidHandError);
    expect(() => notate([['Ac']])).toThrow(InvalidHandError);
  });
});
