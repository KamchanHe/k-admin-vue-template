import type { PaginationRequestType, PaginationResponseType } from '../index';

export interface GetTenantListRequest {}
export interface TenantItemBaseType {
  id: string;
  name: string;
}
export interface TenantListItemType extends TenantItemBaseType {}
export type GetTenantListResponse = TenantListItemType[];

export interface DepartmentItemBaseType {
  id: string;
  departmentCode: string;
  departmentName: string;
}
export interface GetDepartmentTreeRequest {}
export interface DepartmentTreeItemType extends DepartmentItemBaseType {
  children: DepartmentTreeItemType[];
}
export type GetDepartmentTreeResponse = DepartmentTreeItemType[];

export interface PersonnelItemBaseType {
  id: string;
  personnelAccount: string;
  personnelName: string;
  personnelCode: string;
  phone: string;
  departmentId: string;
  departmentInfo: DepartmentInfoBaseType;
  departmentName?: string;
}
export interface PersonnelParamsBaseType {
  multiDeptIds?: string[];
  name?: string;
  code?: string;
}
export interface GetPersonnelPageRequest
  extends PaginationRequestType,
    PersonnelParamsBaseType {}
export interface PersonnelPageItemType extends PersonnelItemBaseType {}
export interface GetPersonnelPageResponse
  extends PaginationResponseType<PersonnelPageItemType[]> {}

export interface GetPersonnelListRequest extends PersonnelParamsBaseType {}
export interface PersonnelListItemType extends PersonnelItemBaseType {}
export type GetPersonnelListResponse = PersonnelListItemType[];
