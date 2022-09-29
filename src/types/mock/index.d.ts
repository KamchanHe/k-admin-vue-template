import type { MockMethod, Recordable } from 'vite-plugin-mock';

export type MockMethodType = MockMethod;
export interface ResponseConfigType {
  url: Recordable;
  body: Recordable;
  query: Recordable;
  headers: Recordable;
}
