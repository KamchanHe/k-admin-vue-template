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
  GetPersonnelPageResponse
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

export default {};
