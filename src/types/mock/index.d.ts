import type { MockMethod, Recordable } from 'vite-plugin-mock';

export interface ResponseConfigType {
  url: Recordable;
  body: Recordable;
  query: Recordable;
  headers: Recordable;
}
export interface MockMethodType extends MockMethod {
  response?: (config: ResponseConfigType) => any;
}
