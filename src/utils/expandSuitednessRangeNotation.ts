import { Hand, Rank } from '@poker-apprentice/types';
import { InvalidHandRangeNotationError } from '~/InvalidHandRangeNotationError';
import { RANK_ORDER } from '~/constants/rankOrder';
import {
  Suitedness,
  SuitednessNotation,
  expandSuitednessNotation,
} from './expandSuitednessNotation';
import { handComparator } from './handComparator';
import { rankComparator } from './rankComparator';

export const expandSuitednessRangeNotation = (
  from: SuitednessNotation,
  to: SuitednessNotation,
): Hand[] => {
  if ((from[0] !== to[0] && from[1] !== to[1]) || from[2] !== to[2]) {
    throw new InvalidHandRangeNotationError(`${from}-${to}`);
  }

  const isHighCardFirst = from[0] === to[0];
  const firstRank = (isHighCardFirst ? from[0] : from[1]) as Rank;
  const [highRank, lowRank] = (
    (isHighCardFirst ? [from[1], to[1]] : [from[0], to[0]]) as Rank[]
  ).sort(rankComparator);
  const suitedness = from[2] as Suitedness;

  const lowRankIndex = RANK_ORDER.indexOf(lowRank);
  const highRankIndex = RANK_ORDER.indexOf(highRank);

  const hands: Hand[] = [];

  for (let i = lowRankIndex; i <= highRankIndex; i += 1) {
    const rank = RANK_ORDER[i] as Rank;
    hands.push(...expandSuitednessNotation(`${firstRank}${rank}${suitedness}`));
  }

  return hands.sort(handComparator);
};
