import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import type { TableHeaderType } from '@/types/constant/table-header';

export type SummaryMethodType<T> = {
  (params: { columns: TableColumnCtx<T>[]; data: T[] }): (string | number)[];
};

export type SelectableMethodType<T> = {
  (row: T, index?: number): boolean;
};

export interface ScopeType<R> {
  column: TableColumnCtx<TableHeaderType>;
  row: R;
}

export default {};
