import { Hand } from '@poker-apprentice/types';
import uniq from 'lodash/uniq';
import { NOTATION_DELIMITER } from './constants/delimiters';
import { InvalidHandRangeNotationError } from './errors/InvalidHandRangeNotationError';
import { expandExactHandNotation, isExactHandNotation } from './utils/expandExactHandNotation';
import { expandPairNotation, isPairNotation } from './utils/expandPairNotation';
import { expandPlusNotation, isPlusNotation } from './utils/expandPlusNotation';
import { expandRangeNotation, isRangeNotation } from './utils/expandRangeNotation';
import { expandSuitednessNotation, isSuitednessNotation } from './utils/expandSuitednessNotation';
import {
  expandUnsuitednessNotation,
  isUnsuitednessNotation,
} from './utils/expandUnsuitednessNotation';
import { handComparator } from './utils/handComparator';

const expandSubNotation = (notation: string): Hand[] => {
  if (isSuitednessNotation(notation)) {
    return expandSuitednessNotation(notation);
  }

  if (isUnsuitednessNotation(notation)) {
    return expandUnsuitednessNotation(notation);
  }

  if (isPairNotation(notation)) {
    return expandPairNotation(notation);
  }

  if (isExactHandNotation(notation)) {
    return [expandExactHandNotation(notation)];
  }

  if (isPlusNotation(notation)) {
    return expandPlusNotation(notation);
  }

  if (isRangeNotation(notation)) {
    return expandRangeNotation(notation);
  }

  throw new InvalidHandRangeNotationError(notation);
};

export const expandNotation = (notation: string): Hand[] => {
  const hands = notation
    .split(NOTATION_DELIMITER)
    .map((val) => val.trim())
    .filter((val) => val !== '')
    .flatMap(expandSubNotation)
    .sort(handComparator);

  return uniq(hands);
};
