import type { PaginationRequestType, PaginationResponseType } from '../index';

export interface GetTablePageRequest extends PaginationRequestType {}

export interface TablePageItemType {
  id: string;
  title: string;
  status: string;
  author: string;
  display_time: string;
  pageviews: number;
}
export interface GetTablePageResponse
  extends PaginationResponseType<TablePageItemType[]> {}
