interface TransformType {
  label: string | number;
  value: string | number;
}

export interface TableHeaderType {
  type?: 'index' | 'slot';
  prop: string | null;
  label: string;
  fixed: boolean;
  show: boolean;
  fixedAlign: 'left' | 'right';
  ellipsis?: boolean;
  showSummary?: boolean;
  decimalDigits?: number;
  summaryDecimalDigits?: number;
  align?: 'left' | 'center' | 'right';
  width?: number;
  minWidth?: number;
  sortable?: 'custom' | boolean;
  timeFormat?: string;
  transformType?: typeof Number | typeof String;
  transform?: TransformType[];
}
