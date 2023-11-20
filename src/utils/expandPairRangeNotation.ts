import { Hand, Rank } from '@poker-apprentice/types';
import { RANK_ORDER } from '~/constants/rankOrder';
import { PairNotation, expandPairNotation, isPairNotation } from './expandPairNotation';
import { handComparator } from './handComparator';
import { rankComparator } from './rankComparator';

export const expandPairRangeNotation = (from: PairNotation, to: PairNotation): Hand[] => {
  const [highRank, lowRank] = [from[0] as Rank, to[0] as Rank].sort(rankComparator);

  const lowRankIndex = RANK_ORDER.indexOf(lowRank);
  const highRankIndex = RANK_ORDER.indexOf(highRank);

  const hands: Hand[] = [];

  for (let i = lowRankIndex; i <= highRankIndex; i += 1) {
    const rank = RANK_ORDER[i] as Rank;
    const notation = `${rank}${rank}`;
    if (isPairNotation(notation)) {
      hands.push(...expandPairNotation(notation));
    }
  }

  return hands.sort(handComparator);
};
