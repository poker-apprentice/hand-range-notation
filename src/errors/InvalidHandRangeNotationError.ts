export class InvalidHandRangeNotationError extends Error {
  constructor(notation: string) {
    super(`Invalid hand range notation: "${notation}".`);
    this.name = 'InvalidHandRangeNotationError';
  }
}
