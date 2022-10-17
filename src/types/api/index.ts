export interface PaginationRequestType {
  pageSize: number;
  pageNum: number;
}

export interface PaginationResponseType<T = unknown> {
  total: number;
  totalPage: number;
  pageNum: number;
  pageSize: number;
  list: T;
}
