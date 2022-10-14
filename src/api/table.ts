import Service from '@/utils/request';
import type {
  GetTablePageRequest,
  GetTablePageResponse
} from '@/types/api/table';

export function getTablePage<
  Q extends GetTablePageRequest,
  S extends GetTablePageResponse
>(data: Q) {
  return Service.get<Q, S>('/table/page', data);
}

export default {};
