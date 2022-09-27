import Service from '@/utils/request';
import type {
  LoginRequest,
  LoginResponse,
  UserInfoRequest,
  UserInfoResponse
} from '@/types/api/user';

export function login<Q = LoginRequest, S = LoginResponse>(data: Q) {
  return Service.post<S>('/user/login', data);
}

export function getInfo<Q = UserInfoRequest, S = UserInfoResponse>(params: Q) {
  return Service.get<S>('/user/info', params);
}

export function logout() {
  return Service.post('/user/logout');
}
