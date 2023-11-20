import { ALL_SUITS, Card, Hand, Rank, isRank } from '@poker-apprentice/types';
import { cardComparator } from './cardComparator';
import { handComparator } from './handComparator';

export type Suitedness = 'o' | 's';
export type SuitednessNotation = `${Rank}${Rank}${Suitedness}`;

export const isSuitednessNotation = (notation: string): notation is SuitednessNotation =>
  notation.length === 3 &&
  isRank(notation[0]) &&
  isRank(notation[1]) &&
  notation[0] !== notation[1] &&
  ['o', 's'].includes(notation[2]);

export const expandSuitednessNotation = (notation: SuitednessNotation): Hand[] => {
  const ranks = [notation[0] as Rank, notation[1] as Rank];
  const suitedness = notation[2] as Suitedness;
  const hands: Hand[] = [];

  if (suitedness === 's') {
    ALL_SUITS.forEach((suit) => {
      const card1: Card = `${ranks[0]}${suit}`;
      const card2: Card = `${ranks[1]}${suit}`;
      if (card1 !== card2) {
        hands.push([card1, card2].sort(cardComparator));
      }
    });
  } else {
    ALL_SUITS.forEach((suit1) => {
      ALL_SUITS.forEach((suit2) => {
        const card1: Card = `${ranks[0]}${suit1}`;
        const card2: Card = `${ranks[1]}${suit2}`;
        if (card1 !== card2 && suit1 !== suit2) {
          hands.push([card1, card2].sort(cardComparator));
        }
      });
    });
  }

  return hands.sort(handComparator);
};
