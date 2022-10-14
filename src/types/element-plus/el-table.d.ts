import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

export type SummaryMethodType<T> = {
  (params: { columns: TableColumnCtx<T>[]; data: T[] }): (string | number)[];
};

export type SelectableMethodType<T> = {
  (row: T, index?: number): boolean;
};

export interface ScopeType<C, R> {
  column: TableColumnCtx<C>;
  row: R;
}

export default {};
