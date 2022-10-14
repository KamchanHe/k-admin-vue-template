import type { MockMethodType, ResponseConfigType } from '@/types/mock';
import Mock from 'mockjs';

const data = Mock.mock({
  'items|300': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
    }
  ]
});

const getTablePage: MockMethodType = {
  url: '/k-admin-template/table/page',
  method: 'get',
  response: (config: ResponseConfigType) => {
    const { pageSize, pageNum } = config.query;
    const { items } = data;
    return {
      code: 200,
      data: {
        total: items.length,
        items: items.slice(pageSize * (pageNum - 1), pageSize * pageNum)
      }
    };
  }
};

export default [getTablePage] as MockMethodType[];
