import type { TableCommonRequestType } from '../index';
import type { TablePageItemType } from './data';

export interface GetTablePageRequest extends TableCommonRequestType {}

export interface GetTablePageResponse {
  total: number;
  items: TablePageItemType[];
}
