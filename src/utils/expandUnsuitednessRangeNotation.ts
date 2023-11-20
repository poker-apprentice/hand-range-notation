import { Hand } from '@poker-apprentice/types';
import { InvalidHandRangeNotationError } from '~/InvalidHandRangeNotationError';
import { expandSuitednessRangeNotation } from './expandSuitednessRangeNotation';
import { UnsuitednessNotation } from './expandUnsuitednessNotation';
import { handComparator } from './handComparator';

export const expandUnsuitednessRangeNotation = (
  from: UnsuitednessNotation,
  to: UnsuitednessNotation,
): Hand[] => {
  if (from[0] !== to[0] && from[1] !== to[1]) {
    throw new InvalidHandRangeNotationError(`${from}-${to}`);
  }

  const hands: Hand[] = [];
  hands.push(...expandSuitednessRangeNotation(`${from}s`, `${to}s`));
  hands.push(...expandSuitednessRangeNotation(`${from}o`, `${to}o`));
  return hands.sort(handComparator);
};
