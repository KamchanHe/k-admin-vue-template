import type { TableHeaderType } from '@/types/constant/table-header';

export const $tableHeader: TableHeaderType[] = [
  {
    type: 'index',
    prop: null,
    label: '序号',
    show: true,
    fixed: false,
    fixedAlign: 'left',
    width: 55,
    align: 'center'
  },
  {
    prop: 'title',
    label: 'Title',
    fixed: false,
    show: true,
    fixedAlign: 'left',
    ellipsis: false
  },
  {
    prop: 'author',
    label: 'Author',
    fixed: false,
    show: true,
    fixedAlign: 'left',
    showSummary: true
  },
  {
    prop: 'pageviews',
    label: 'Pageviews',
    fixed: false,
    show: true,
    fixedAlign: 'left',
    showSummary: true,
    decimalDigits: 2,
    summaryDecimalDigits: 5
  },
  {
    prop: 'status',
    label: 'Status',
    fixed: false,
    show: true,
    fixedAlign: 'left',
    transformType: String,
    transform: [
      {
        label: '已发布',
        value: 'published'
      },
      {
        label: '草稿',
        value: 'draft'
      },
      {
        label: '已删除',
        value: 'deleted'
      }
    ]
  },
  {
    prop: 'display_time',
    label: 'Create_at',
    fixed: false,
    show: true,
    fixedAlign: 'left',
    timeFormat: 'YYYY-MM-DD HH:mm'
  }
];

export default {};
