export interface TenantItemType {
  label: string;
  value: string;
}

export interface OrganizationStoreType {
  tenant: string;
  tenantList: TenantItemType[];
}
