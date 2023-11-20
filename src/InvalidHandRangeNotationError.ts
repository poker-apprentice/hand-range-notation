export class InvalidHandRangeNotationError extends Error {
  constructor(notation: string) {
    const message = `Invalid hand range notation: "${notation}"`;
    super(message);

    this.name = 'InvalidHandRangeNotationError';
  }
}
