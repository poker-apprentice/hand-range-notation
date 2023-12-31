import { NOTATION_DELIMITER } from './constants/delimiters';
import { InvalidHandRangeNotationError } from './errors/InvalidHandRangeNotationError';
import { expandNotation } from './expandNotation';

describe('expandNotation', () => {
  const validRanges = ['A2s-A5s', 'AKo', 'KsQh', 'ATs+', 'TT+', '55-22'] as const;

  it('handles multiple notations of varying types', () => {
    expect(expandNotation(validRanges.join(NOTATION_DELIMITER))).toMatchInlineSnapshot(`
      [
        [
          "As",
          "Ah",
        ],
        [
          "As",
          "Ad",
        ],
        [
          "As",
          "Ac",
        ],
        [
          "Ah",
          "Ad",
        ],
        [
          "Ah",
          "Ac",
        ],
        [
          "Ad",
          "Ac",
        ],
        [
          "As",
          "Ks",
        ],
        [
          "As",
          "Kh",
        ],
        [
          "As",
          "Kd",
        ],
        [
          "As",
          "Kc",
        ],
        [
          "Ah",
          "Ks",
        ],
        [
          "Ah",
          "Kh",
        ],
        [
          "Ah",
          "Kd",
        ],
        [
          "Ah",
          "Kc",
        ],
        [
          "Ad",
          "Ks",
        ],
        [
          "Ad",
          "Kh",
        ],
        [
          "Ad",
          "Kd",
        ],
        [
          "Ad",
          "Kc",
        ],
        [
          "Ac",
          "Ks",
        ],
        [
          "Ac",
          "Kh",
        ],
        [
          "Ac",
          "Kd",
        ],
        [
          "Ac",
          "Kc",
        ],
        [
          "As",
          "Qs",
        ],
        [
          "Ah",
          "Qh",
        ],
        [
          "Ad",
          "Qd",
        ],
        [
          "Ac",
          "Qc",
        ],
        [
          "As",
          "Js",
        ],
        [
          "Ah",
          "Jh",
        ],
        [
          "Ad",
          "Jd",
        ],
        [
          "Ac",
          "Jc",
        ],
        [
          "As",
          "Ts",
        ],
        [
          "Ah",
          "Th",
        ],
        [
          "Ad",
          "Td",
        ],
        [
          "Ac",
          "Tc",
        ],
        [
          "As",
          "5s",
        ],
        [
          "Ah",
          "5h",
        ],
        [
          "Ad",
          "5d",
        ],
        [
          "Ac",
          "5c",
        ],
        [
          "As",
          "4s",
        ],
        [
          "Ah",
          "4h",
        ],
        [
          "Ad",
          "4d",
        ],
        [
          "Ac",
          "4c",
        ],
        [
          "As",
          "3s",
        ],
        [
          "Ah",
          "3h",
        ],
        [
          "Ad",
          "3d",
        ],
        [
          "Ac",
          "3c",
        ],
        [
          "As",
          "2s",
        ],
        [
          "Ah",
          "2h",
        ],
        [
          "Ad",
          "2d",
        ],
        [
          "Ac",
          "2c",
        ],
        [
          "Ks",
          "Kh",
        ],
        [
          "Ks",
          "Kd",
        ],
        [
          "Ks",
          "Kc",
        ],
        [
          "Kh",
          "Kd",
        ],
        [
          "Kh",
          "Kc",
        ],
        [
          "Kd",
          "Kc",
        ],
        [
          "Ks",
          "Qh",
        ],
        [
          "Qs",
          "Qh",
        ],
        [
          "Qs",
          "Qd",
        ],
        [
          "Qs",
          "Qc",
        ],
        [
          "Qh",
          "Qd",
        ],
        [
          "Qh",
          "Qc",
        ],
        [
          "Qd",
          "Qc",
        ],
        [
          "Js",
          "Jh",
        ],
        [
          "Js",
          "Jd",
        ],
        [
          "Js",
          "Jc",
        ],
        [
          "Jh",
          "Jd",
        ],
        [
          "Jh",
          "Jc",
        ],
        [
          "Jd",
          "Jc",
        ],
        [
          "Ts",
          "Th",
        ],
        [
          "Ts",
          "Td",
        ],
        [
          "Ts",
          "Tc",
        ],
        [
          "Th",
          "Td",
        ],
        [
          "Th",
          "Tc",
        ],
        [
          "Td",
          "Tc",
        ],
        [
          "5s",
          "5h",
        ],
        [
          "5s",
          "5d",
        ],
        [
          "5s",
          "5c",
        ],
        [
          "5h",
          "5d",
        ],
        [
          "5h",
          "5c",
        ],
        [
          "5d",
          "5c",
        ],
        [
          "4s",
          "4h",
        ],
        [
          "4s",
          "4d",
        ],
        [
          "4s",
          "4c",
        ],
        [
          "4h",
          "4d",
        ],
        [
          "4h",
          "4c",
        ],
        [
          "4d",
          "4c",
        ],
        [
          "3s",
          "3h",
        ],
        [
          "3s",
          "3d",
        ],
        [
          "3s",
          "3c",
        ],
        [
          "3h",
          "3d",
        ],
        [
          "3h",
          "3c",
        ],
        [
          "3d",
          "3c",
        ],
        [
          "2s",
          "2h",
        ],
        [
          "2s",
          "2d",
        ],
        [
          "2s",
          "2c",
        ],
        [
          "2h",
          "2d",
        ],
        [
          "2h",
          "2c",
        ],
        [
          "2d",
          "2c",
        ],
      ]
    `);
  });

  it('orders the hands by rank, then suit', () => {
    expect(expandNotation(validRanges.join(NOTATION_DELIMITER))).toEqual(
      expandNotation([...validRanges].reverse().join(NOTATION_DELIMITER)),
    );
  });

  it('strips whitespace between commas', () => {
    expect(expandNotation(validRanges.join(` ${NOTATION_DELIMITER} `))).toEqual(
      expandNotation(validRanges.join(NOTATION_DELIMITER)),
    );
  });

  it('throws on invalid ranges', () => {
    expect(() => expandNotation(['AA-QQ', 'AI+'].join(NOTATION_DELIMITER))).toThrow(
      new InvalidHandRangeNotationError('AI+'),
    );
  });
});
