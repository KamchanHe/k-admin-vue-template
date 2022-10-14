import { defineStore } from 'pinia';
import { getTenantList as apiGetTenantList } from '@/api/organization';
import {
  getTenant as authGetTenant,
  removeTenant as authRemoveTenant,
  setTenant as authSetTenant
} from '@/utils/auth';
import type { OrganizationStoreType } from '@/types/store/organization';
import { BiMapConversion } from '@/utils/bi-map';
import { $tenantItemMap } from '@/constant/bi-map/organization';
import { map as _map } from 'lodash-es';

const useOrganizationStore = defineStore({
  id: 'organization',
  state: (): OrganizationStoreType => ({
    tenant: authGetTenant(),
    tenantList: []
  }),
  actions: {
    resetState() {
      this.$reset();
    },
    getTenantList() {
      return new Promise((resolve, reject) => {
        apiGetTenantList()
          .then((res) => {
            const { data } = res;
            const biMapData = BiMapConversion(
              data,
              $tenantItemMap
            ) as typeof data;
            const result = _map(biMapData, (item) => {
              const { id, name } = item;
              return {
                label: name,
                value: id
              };
            });
            this.tenantList = result;
            resolve(result);
          })
          .catch((err) => {
            reject(new Error(err));
          });
      });
    },
    setTenant(tenant: string) {
      authSetTenant(tenant);
      this.tenant = tenant;
    },
    removeTenant() {
      authRemoveTenant();
      this.tenant = '';
    }
  }
});

export default useOrganizationStore;
