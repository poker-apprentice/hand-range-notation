import { Rank } from '@poker-apprentice/types';
import { RANK_ORDER } from '~/constants/rankOrder';

export const rankComparator = (a: Rank, b: Rank): -1 | 0 | 1 => {
  const rankA = RANK_ORDER.indexOf(a);
  const rankB = RANK_ORDER.indexOf(b);

  if (rankA === rankB) {
    return 0;
  }

  return rankA < rankB ? 1 : -1;
};
