import Service from '@/utils/request';
import type {
  GetTenantListRequest,
  GetTenantListResponse
} from '@/types/api/organization';

export function getTenantList<
  Q extends GetTenantListRequest,
  S extends GetTenantListResponse[]
>(data?: Q) {
  return Service.get<Q, S>('/portal/listTenant', data);
}

export default {};
