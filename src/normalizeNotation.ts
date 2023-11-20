import { expandNotation } from './expandNotation';
import { notate } from './notate';

export const normalizeNotation = (str: string): string => notate(expandNotation(str));
