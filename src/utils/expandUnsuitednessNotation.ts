import { Hand, Rank, isRank } from '@poker-apprentice/types';
import type { PermutationPairs } from '~/types/PermutationPairs';
import { expandSuitednessNotation } from './expandSuitednessNotation';
import { handComparator } from './handComparator';

export type UnsuitednessNotation = PermutationPairs<Rank>;

export const isUnsuitednessNotation = (notation: string): notation is UnsuitednessNotation =>
  notation.length === 2 &&
  isRank(notation[0]) &&
  isRank(notation[1]) &&
  notation[0] !== notation[1];

export const expandUnsuitednessNotation = (notation: UnsuitednessNotation): Hand[] => {
  const hands: Hand[] = [];
  hands.push(...expandSuitednessNotation(`${notation}s`));
  hands.push(...expandSuitednessNotation(`${notation}o`));
  return hands.sort(handComparator);
};
