import { UserStoreType } from '@/types/store/user';

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

export type UserInfoResponse = UserStoreType;
