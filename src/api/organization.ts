import Service from '@/utils/request';
import type {
  // tenant
  GetTenantListRequest,
  GetTenantListResponse,
  // department
  GetDepartmentTreeRequest,
  GetDepartmentTreeResponse,
  // personnel
  GetPersonnelListRequest,
  GetPersonnelListResponse,
  GetPersonnelPageRequest,
  GetPersonnelPageResponse,
  // role
  GetRoleListRequest,
  GetRoleListResponse,
  GetRoleDetailRequest,
  GetRoleDetailResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
  DeleteRoleRequest,
  DeleteRoleResponse,
  SaveRolePersonnelRequest,
  SaveRolePersonnelResponse,
  RemoveRolePersonnelRequest,
  RemoveRolePersonnelResponse,
  // permission
  GetMenuTreeRequest,
  GetMenuTreeResponse,
  SaveRoleMenuRequest,
  SaveRoleMenuResponse
} from '@/types/api/organization';

// tenant
export function getTenantList<
  Q extends GetTenantListRequest,
  S extends GetTenantListResponse
>(data?: Q) {
  return Service.get<Q, S>('/portal/listTenant', data);
}

// department
export function getDepartmentTree<
  Q extends GetDepartmentTreeRequest,
  S extends GetDepartmentTreeResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/dept/tree', data);
}

// personnel
export function getPersonnelList<
  Q extends GetPersonnelListRequest,
  S extends GetPersonnelListResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/user/list', data);
}

export function getPersonnelPage<
  Q extends GetPersonnelPageRequest,
  S extends GetPersonnelPageResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/user/page', data);
}

// role
export function getRoleList<
  Q extends GetRoleListRequest,
  S extends GetRoleListResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/role/list', data);
}

export function getRoleDetail<
  Q extends GetRoleDetailRequest,
  S extends GetRoleDetailResponse
>(id: Q) {
  return Service.get<Q, S>(`sys/role/getById/${id}`);
}

export function createRole<
  Q extends CreateRoleRequest,
  S extends CreateRoleResponse
>(data: Q) {
  return Service.post<Q, S>('sys/role/save', data);
}

export function updateRole<
  Q extends UpdateRoleRequest,
  S extends UpdateRoleResponse
>(data: Q) {
  return Service.post<Q, S>('sys/role/updateById', data);
}

export function deleteRole<
  Q extends DeleteRoleRequest,
  S extends DeleteRoleResponse
>(id: Q) {
  return Service.post<Q, S>(`sys/role/deleteById/${id}`);
}

export function saveRolePersonnel<
  Q extends SaveRolePersonnelRequest,
  S extends SaveRolePersonnelResponse
>(data: Q) {
  return Service.post<Q, S>('sys/role/saveUserRole', data);
}

export function removeRolePersonnel<
  Q extends RemoveRolePersonnelRequest,
  S extends RemoveRolePersonnelResponse
>(data: Q) {
  return Service.post<Q, S>('sys/role/removeUserRole', data);
}

// permission
export function getMenuTree<
  Q extends GetMenuTreeRequest,
  S extends GetMenuTreeResponse
>(data: Q) {
  return Service.get<Q, S>('sys/menu/tree', data);
}

export function saveRoleMenu<
  Q extends SaveRoleMenuRequest,
  S extends SaveRoleMenuResponse
>(data: Q) {
  return Service.post<Q, S>('sys/role/saveRoleMenu', data);
}

export default {};
