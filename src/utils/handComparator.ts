import { Card, getRank, getSuit } from '@poker-apprentice/types';
import { rankComparator } from './rankComparator';
import { suitComparator } from './suitComparator';

export const handComparator = (a: Card[], b: Card[]) => {
  for (let i = 0; i < a.length; i += 1) {
    if (!b[i]) {
      return -1;
    }
    const result = rankComparator(getRank(a[i]), getRank(b[i]));
    if (result !== 0) {
      return result;
    }
  }

  if (b.length > a.length) {
    return 1;
  }

  for (let i = 0; i < a.length; i += 1) {
    const result = suitComparator(getSuit(a[i]), getSuit(b[i]));
    if (result !== 0) {
      return result;
    }
  }

  return 0;
};
