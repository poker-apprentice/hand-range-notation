import { ALL_SUITS, Card, Hand, Rank, isRank } from '@poker-apprentice/types';
import { cardComparator } from './cardComparator';
import { handComparator } from './handComparator';

type RepeatString<
  T extends string,
  C extends number,
  Result extends string = '',
  Counter extends unknown[] = [],
> = Counter['length'] extends C
  ? Result
  : RepeatString<T, C, `${Result}${T}`, [...Counter, unknown]>;

type ExtractLiteral<T extends string, N extends number> = T extends infer R extends string
  ? RepeatString<R, N>
  : never;

export type PairNotation = ExtractLiteral<Rank, 2>;

export const isPairNotation = (notation: string): notation is PairNotation =>
  notation.length === 2 &&
  isRank(notation[0]) &&
  isRank(notation[1]) &&
  notation[0] === notation[1];

export const expandPairNotation = (notation: PairNotation): Hand[] => {
  const hands: Hand[] = [];

  ALL_SUITS.slice(0, -1).forEach((suit1, i) => {
    ALL_SUITS.slice(i + 1).forEach((suit2) => {
      const card1: Card = `${notation[0] as Rank}${suit1}`;
      const card2: Card = `${notation[1] as Rank}${suit2}`;
      hands.push([card1, card2].sort(cardComparator));
    });
  });

  return hands.sort(handComparator);
};
