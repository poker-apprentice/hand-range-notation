import { Suit } from '@poker-apprentice/types';
import { SUIT_ORDER } from '~/constants/suitOrder';

export const suitComparator = (a: Suit, b: Suit): -1 | 0 | 1 => {
  const suitA = SUIT_ORDER.indexOf(a);
  const suitB = SUIT_ORDER.indexOf(b);

  if (suitA === suitB) {
    return 0;
  }

  return suitA < suitB ? 1 : -1;
};
