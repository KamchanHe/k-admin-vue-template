export interface SelectDepartmentTreeItemBaseType {
  id: string;
  departmentCode: string;
  departmentName: string;
}
export interface GetSelectDepartmentTreeRequest {}
export interface SelectDepartmentTreeItemType
  extends SelectDepartmentTreeItemBaseType {
  children?: SelectDepartmentTreeItemType[];
}
export type GetSelectDepartmentTreeResponse = SelectDepartmentTreeItemType[];

export interface SelectPersonnelItemBaseType {
  id: string;
  personnelName: string;
  personnelCode: string;
}
export interface SelectPersonnelParamsBaseType {
  multiDeptIds?: string[];
  name?: string;
  code?: string;
}
export interface GetSelectPersonnelListRequest
  extends SelectPersonnelParamsBaseType {}
export interface SelectPersonnelListItemType
  extends SelectPersonnelItemBaseType {}
export type GetSelectPersonnelListResponse = SelectPersonnelListItemType[];
