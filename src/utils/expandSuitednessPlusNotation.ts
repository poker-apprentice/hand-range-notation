import { Hand, Rank } from '@poker-apprentice/types';
import { RANK_ORDER } from '~/constants/rankOrder';
import {
  Suitedness,
  SuitednessNotation,
  expandSuitednessNotation,
} from './expandSuitednessNotation';
import { handComparator } from './handComparator';
import { rankComparator } from './rankComparator';

// TODO: Can we call `expandSuitednessRangeNotation` from here instead of duplicating logic?
export const expandSuitednessPlusNotation = (notation: SuitednessNotation): Hand[] => {
  const [highRank, lowRank] = [notation[0] as Rank, notation[1] as Rank].sort(rankComparator);
  const suitedness = notation[2] as Suitedness;

  const lowRankIndex = RANK_ORDER.indexOf(lowRank);
  const highRankIndex = RANK_ORDER.indexOf(highRank);

  const hands: Hand[] = [];

  for (let i = lowRankIndex; i < highRankIndex; i += 1) {
    const rank = RANK_ORDER[i] as Rank;
    hands.push(...expandSuitednessNotation(`${highRank}${rank}${suitedness}`));
  }

  return hands.sort(handComparator);
};
