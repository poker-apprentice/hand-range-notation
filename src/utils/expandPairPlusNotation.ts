import { Hand, Rank } from '@poker-apprentice/types';
import { RANK_ORDER } from '~/constants/rankOrder';
import { PairNotation, expandPairNotation, isPairNotation } from './expandPairNotation';
import { handComparator } from './handComparator';

export const expandPairPlusNotation = (notation: PairNotation): Hand[] => {
  const lowRankIndex = RANK_ORDER.indexOf(notation[0]);
  const highRankIndex = RANK_ORDER.indexOf('A');

  const hands: Hand[] = [];

  for (let i = lowRankIndex; i < highRankIndex; i += 1) {
    const rank = RANK_ORDER[i] as Rank;
    const pairNotation = `${rank}${rank}`;
    if (isPairNotation(pairNotation)) {
      hands.push(...expandPairNotation(pairNotation));
    }
  }

  return hands.sort(handComparator);
};
