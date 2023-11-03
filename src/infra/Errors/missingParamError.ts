export class MissingParamError extends Error {
  constructor(paramName: string) {
    super('Missing param');
    this.name = paramName;
  }
}
