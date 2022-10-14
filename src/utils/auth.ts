import { localGet, localSet, localRemove } from '@/utils/storage';

const TokenKey = 'K-Admin-Token';
export function getToken(): string {
  return localGet(TokenKey) || '';
}

export function setToken(token: string) {
  return localSet(TokenKey, token);
}

export function removeToken() {
  return localRemove(TokenKey);
}

const TenantKey = 'K-Admin-Tenant';
export function getTenant(): string {
  return localGet(TenantKey) || '';
}

export function setTenant(tenant: string) {
  return localSet(TenantKey, tenant);
}

export function removeTenant() {
  return localRemove(TenantKey);
}

export default {};
