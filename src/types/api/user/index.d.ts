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
  id: string;
  account: string;
  roles: RolesType;
  username?: string;
  avatar?: string;
  userCode?: string;
  phone?: string;
}
