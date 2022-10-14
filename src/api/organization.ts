import Service from '@/utils/request';
import type {
  GetTenantListRequest,
  GetTenantListResponse,
  GetDepartmentTreeRequest,
  GetDepartmentTreeResponse
} from '@/types/api/organization';

export function getTenantList<
  Q extends GetTenantListRequest,
  S extends GetTenantListResponse[]
>(data?: Q) {
  return Service.get<Q, S>('/portal/listTenant', data);
}

export function getDepartmentTree<
  Q extends GetDepartmentTreeRequest,
  S extends GetDepartmentTreeResponse[]
>(data?: Q) {
  return Service.get<Q, S>('sys/dept/tree', data);
}

export default {};
