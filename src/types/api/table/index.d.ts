import type { TableCommonRequestType } from '../index';

export interface GetTablePageRequest extends TableCommonRequestType {}

export interface TablePageItemType {
  id: string;
  title: string;
  status: string;
  author: string;
  display_time: string;
  pageviews: number;
}
export interface GetTablePageResponse {
  total: number;
  items: TablePageItemType[];
}
