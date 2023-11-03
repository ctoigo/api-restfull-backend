import { HttpResponse } from '@/infra/Helpers/httpHelper';

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
