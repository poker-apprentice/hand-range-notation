import { Hand } from '@poker-apprentice/types';
import { InvalidHandRangeNotationError } from '~/errors/InvalidHandRangeNotationError';
import { isPairNotation } from './expandPairNotation';
import { expandPairPlusNotation } from './expandPairPlusNotation';
import { isSuitednessNotation } from './expandSuitednessNotation';
import { expandSuitednessPlusNotation } from './expandSuitednessPlusNotation';

export const isPlusNotation = (notation: string) => notation.substring(notation.length - 1) === '+';

export const expandPlusNotation = (notation: string): Hand[] => {
  const subNotation = notation.substring(0, notation.length - 1);

  if (isSuitednessNotation(subNotation)) {
    return expandSuitednessPlusNotation(subNotation);
  }

  if (isPairNotation(subNotation)) {
    return expandPairPlusNotation(subNotation);
  }

  throw new InvalidHandRangeNotationError(notation);
};
