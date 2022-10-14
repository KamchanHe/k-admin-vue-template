import { RolesType } from '@/types/store/user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserInfoRequest {
  token: string;
}

export interface UserInfoResponse {
  token: string;
  nickname: string;
  avatar: string;
  roles: RolesType;
}
