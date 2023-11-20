import { Card, getRank, getSuit } from '@poker-apprentice/types';
import { rankComparator } from './rankComparator';
import { suitComparator } from './suitComparator';

export const cardComparator = (a: Card, b: Card): -1 | 0 | 1 => {
  const rankResult = rankComparator(getRank(a), getRank(b));
  if (rankResult === 0) {
    return suitComparator(getSuit(a), getSuit(b));
  }
  return rankResult;
};
