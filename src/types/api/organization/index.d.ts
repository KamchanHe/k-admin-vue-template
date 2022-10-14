export interface GetTenantListRequest {}

export interface GetTenantListResponse {
  id: string;
  name: string;
}

export interface GetDepartmentTreeRequest {}

export interface DepartmentTreeItemType {
  id: string;
  departmentCode: string;
  departmentName: string;
  children: DepartmentTreeItemType[];
}
export interface GetDepartmentTreeResponse extends DepartmentTreeItemType {}
