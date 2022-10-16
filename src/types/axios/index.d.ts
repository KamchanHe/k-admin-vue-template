export interface ResultType<T = unknown> {
  code?: number;
  status?: number;
  message?: string;
  msg?: string;
  data: T;
}
