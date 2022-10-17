import Service from '@/utils/request';
import type {
  GetSelectDepartmentTreeRequest,
  GetSelectDepartmentTreeResponse,
  GetSelectPersonnelListRequest,
  GetSelectPersonnelListResponse
} from '@/types/api/organization-select';

export function getSelectDepartmentTree<
  Q extends GetSelectDepartmentTreeRequest,
  S extends GetSelectDepartmentTreeResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/dept/tree', data);
}

export function getSelectPersonnelList<
  Q extends GetSelectPersonnelListRequest,
  S extends GetSelectPersonnelListResponse
>(data?: Q) {
  return Service.get<Q, S>('sys/user/list', data);
}

export default {};
