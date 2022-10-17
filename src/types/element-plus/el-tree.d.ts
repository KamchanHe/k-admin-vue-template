export interface CheckedDataType<T> {
  checkedNodes: T[];
  checkedKeys: string[];
  halfCheckedNodes: T[];
  halfCheckedKeys: string[];
}

export interface TreeNodeDataType {
  [key: string]: any;
}
