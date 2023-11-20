import { Hand, Rank, getRank, getSuit } from '@poker-apprentice/types';
import uniq from 'lodash/uniq';
import { RANK_ORDER } from './constants/rankOrder';
import { InvalidHandError } from './errors/InvalidHandError';
import { cardComparator } from './utils/cardComparator';
import { getEntries } from './utils/getEntries';
import { handComparator } from './utils/handComparator';

type RankCombination = `${Rank}${Rank}`;
type HandMap = Partial<Record<RankCombination, Hand[]>>;

const groupHands = (hands: Hand[]) => {
  const pairHands: HandMap = {};
  const suitedHands: HandMap = {};
  const unsuitedHands: HandMap = {};

  hands.forEach((hand) => {
    if (hand.length !== 2) {
      throw new InvalidHandError(hand);
    }

    const ranks = hand.map(getRank);
    const rankCombination = ranks.join('') as RankCombination;

    if (uniq(ranks).length === 1) {
      (pairHands[rankCombination] ||= []).push([...hand].sort(cardComparator));
    }

    const suits = hand.map(getSuit);
    if (uniq(suits).length === 1) {
      (suitedHands[rankCombination] ||= []).push([...hand].sort(cardComparator));
    } else {
      (unsuitedHands[rankCombination] ||= []).push([...hand].sort(cardComparator));
    }
  });

  [pairHands, suitedHands, unsuitedHands].forEach((handMap) => {
    Object.values(handMap).forEach((mappedHands) => {
      mappedHands.sort(handComparator);
    });
  });

  return { pairHands, suitedHands, unsuitedHands };
};

const rankCombinationComparator = (a: RankCombination, b: RankCombination): -1 | 0 | 1 => {
  const ranksA = a.split('').map((rank) => RANK_ORDER.indexOf(rank));
  const ranksB = b.split('').map((rank) => RANK_ORDER.indexOf(rank));

  for (let i = 0; i < ranksA.length; i += 1) {
    const rankA = ranksA[i];
    const rankB = ranksB[i];
    if (rankA < rankB) {
      return 1;
    }
    if (rankA > rankB) {
      return -1;
    }
  }

  return 0;
};

const extractMatches = (
  handMap: HandMap,
  expectedPair: boolean,
  expectedMatchCount: number,
): { sets: RankCombination[]; exact: Hand[] } => {
  const sets = new Set<RankCombination>();
  const exact = new Set<Hand>();

  getEntries(handMap).forEach(([rankCombination, hands]) => {
    const isPair = uniq(rankCombination.split('')).length === 1;
    if (isPair !== expectedPair) {
      return;
    }

    if (hands?.length === expectedMatchCount) {
      sets.add(rankCombination);
    } else {
      hands?.forEach((hand) => exact.add(hand));
    }
  });

  const orderedSets = Array.from(sets).sort(rankCombinationComparator);
  const orderedExact = Array.from(exact)
    .map((hand) => hand.sort(cardComparator))
    .sort(handComparator);

  return { sets: orderedSets, exact: orderedExact };
};

export const notate = (hands: Hand[]): string => {
  const { pairHands, suitedHands, unsuitedHands } = groupHands(hands);

  const { sets: fullPairSets, exact: exactPairHands } = extractMatches(pairHands, true, 6);
  const { sets: fullSuitedSets, exact: exactSuitedHands } = extractMatches(suitedHands, false, 4);
  const { sets: fullUnsuitedSets, exact: exactUnsuitedHands } = extractMatches(
    unsuitedHands,
    false,
    12,
  );

  // TODO: Order hands from strongest to weakest, extract X-Y ranges & X+ ranges.
  return [
    ...fullPairSets,
    ...fullSuitedSets.map((combo) => `${combo}s`),
    ...fullUnsuitedSets.map((combo) => `${combo}o`),
    ...exactPairHands.map((hand) => hand.join('')),
    ...exactSuitedHands.map((hand) => hand.join('')),
    ...exactUnsuitedHands.map((hand) => hand.join('')),
  ].join(',');
};
