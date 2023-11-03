export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super('Invalid param');
    this.name = paramName;
  }
}
