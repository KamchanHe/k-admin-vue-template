import type { MockMethodType } from '@/types/mock';
import Mock from 'mockjs';

const data = Mock.mock({
  'list|300': [
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
  response: (config) => {
    const { pageSize, pageNum } = config.query;
    const { list } = data;
    return {
      code: 200,
      data: {
        total: list.length,
        list: list.slice(pageSize * (pageNum - 1), pageSize * pageNum)
      }
    };
  }
};

export default [getTablePage];
