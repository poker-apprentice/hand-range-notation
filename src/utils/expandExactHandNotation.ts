import { Card, Hand, isCard } from '@poker-apprentice/types';
import type { PermutationPairs } from '~/types/PermutationPairs';
import { cardComparator } from './cardComparator';

export type ExactHandNotation = PermutationPairs<Card>;

export const isExactHandNotation = (str: string): str is ExactHandNotation => {
  if (str.length !== 4) {
    return false;
  }
  const card1 = str.substring(0, 2);
  const card2 = str.substring(2, 4);
  return isCard(card1) && isCard(card2) && card1 !== card2;
};

export const expandExactHandNotation = (notation: ExactHandNotation): Hand => {
  const card1 = notation.substring(0, 2) as Card;
  const card2 = notation.substring(2, 4) as Card;
  return [card1, card2].sort(cardComparator);
};
