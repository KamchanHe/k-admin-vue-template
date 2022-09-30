export interface ResultType<T> {
  code: number;
  message: string;
  data: T;
}
