export class EmailInUseError extends Error {
  constructor() {
    super('EmailInUseError');
    this.name = 'The received email is already in use';
  }
}
