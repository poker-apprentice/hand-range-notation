import { Hand } from '@poker-apprentice/types';

export class InvalidHandError extends Error {
  constructor(hand: Hand) {
    super(`Invalid hand: "${hand.join('')}". Only 2-card hands are supported.`);
    this.name = 'InvalidHandError';
  }
}
