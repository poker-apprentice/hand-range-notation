import { Hand } from '@poker-apprentice/types';
import { RANGE_DELIMITER } from '~/constants/delimiters';
import { InvalidHandRangeNotationError } from '~/errors/InvalidHandRangeNotationError';
import { isPairNotation } from './expandPairNotation';
import { expandPairRangeNotation } from './expandPairRangeNotation';
import { isSuitednessNotation } from './expandSuitednessNotation';
import { expandSuitednessRangeNotation } from './expandSuitednessRangeNotation';
import { isUnsuitednessNotation } from './expandUnsuitednessNotation';
import { expandUnsuitednessRangeNotation } from './expandUnsuitednessRangeNotation';

export type RangeNotation = `${string}-${string}`;

export const isRangeNotation = (notation: string): notation is RangeNotation =>
  notation.split(RANGE_DELIMITER).length === 2;

export const expandRangeNotation = (notation: RangeNotation): Hand[] => {
  const subNotations = notation.split(RANGE_DELIMITER, 2).map((str) => str.trim());

  if (subNotations.every(isSuitednessNotation)) {
    return expandSuitednessRangeNotation(subNotations[0], subNotations[1]);
  }

  if (subNotations.every(isUnsuitednessNotation)) {
    return expandUnsuitednessRangeNotation(subNotations[0], subNotations[1]);
  }

  if (subNotations.every(isPairNotation)) {
    return expandPairRangeNotation(subNotations[0], subNotations[1]);
  }

  throw new InvalidHandRangeNotationError(notation);
};
