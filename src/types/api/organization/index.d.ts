import type { PaginationRequestType, PaginationResponseType } from '../index';

// tenant
export interface GetTenantListRequest {}
export interface TenantItemBaseType {
  id: string;
  name: string;
}
export interface TenantListItemType extends TenantItemBaseType {}
export type GetTenantListResponse = TenantListItemType[];

// department
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

// personnel
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

// role
export interface RoleItemBaseType {
  id: string;
  enable: 0 | 1;
  isDefault: 0 | 1;
  roleName: string;
}
export interface GetRoleListRequest {}
export interface RoleListItemType extends RoleItemBaseType {}
export type GetRoleListResponse = RoleListItemType[];

export type GetRoleDetailRequest = string;
export interface GetRoleDetailResponse extends RoleItemBaseType {
  menuSelection: PermissionItemBaseType[];
}

export interface CreateRoleRequest {
  enable: 0 | 1;
  name: string;
}
export interface CreateRoleResponse {}

export interface UpdateRoleRequest {
  id: string;
  enable: 0 | 1;
  name: string;
}
export interface UpdateRoleResponse {}

export type DeleteRoleRequest = string;
export interface DeleteRoleResponse {}

export interface SaveRolePersonnelRequest {
  roleId: string;
  userIds: string[];
}
export interface SaveRolePersonnelResponse {}

export interface RemoveRolePersonnelRequest {
  roleId: string;
  userIds: string[];
}
export interface RemoveRolePersonnelResponse {}

// permission
export interface PermissionItemBaseType {
  id: string;
  permissionName: string;
  parentId: string;
  clientType: 0 | 1;
}

export interface GetMenuTreeRequest {}
export type GetMenuTreeResponse = PermissionItemBaseType[];

export interface SaveRoleMenuRequest {
  clientType: 0 | 1;
  menuIds: string[];
  roleId: string;
}
export interface SaveRoleMenuResponse {}
