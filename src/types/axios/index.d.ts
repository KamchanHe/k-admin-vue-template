export interface ResultType<T> {
  code?: number;
  status?: number;
  message?: string;
  msg?: string;
  data: T;
}
