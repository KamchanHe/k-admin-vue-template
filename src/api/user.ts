import Service from '@/utils/request';
import type {
  LoginRequest,
  LoginResponse,
  UserInfoRequest,
  UserInfoResponse
} from '@/types/api/user';

export function login<Q extends LoginRequest, S extends LoginResponse>(
  data: Q
) {
  return Service.post<Q, S>('/portal/login', data);
}

export function getInfo<Q extends UserInfoRequest, S extends UserInfoResponse>(
  params: Q
) {
  return Service.get<Q, S>('/sys/user/info', params);
}

export function logout() {
  return Service.post('/portal/logout');
}
