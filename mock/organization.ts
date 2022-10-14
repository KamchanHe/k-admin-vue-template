import type { MockMethodType } from '@/types/mock';

const getTenantList: MockMethodType = {
  url: '/k-admin-template/portal/listTenant',
  method: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          id: '001',
          name: '嘉士利集团'
        },
        {
          id: '002',
          name: '嘉宝莉集团'
        }
      ]
    };
  }
};

export default [getTenantList];
