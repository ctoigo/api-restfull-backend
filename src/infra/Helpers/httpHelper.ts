import {
  EmailInUseError,
  MissingParamError,
  ServerError,
  UnauthorizedError,
} from '@/infra/Errors';

export type HttpResponse = {
  statusCode: number;
  body: any;
};

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const noParams = (value: string): HttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(value),
});

export const notFound = (value: string): HttpResponse => ({
  statusCode: 404,
  body: value,
});

export const notAcceptable = (value: string): HttpResponse => ({
  statusCode: 406,
  body: new MissingParamError(value),
});

export const foundData = (value: string): HttpResponse => ({
  statusCode: 470,
  body: value,
});

export const foundEmail = (): HttpResponse => ({
  statusCode: 470,
  body: new EmailInUseError(),
});
