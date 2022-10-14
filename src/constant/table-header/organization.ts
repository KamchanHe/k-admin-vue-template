import type { TableHeaderType } from '@/types/constant/table-header';
// 部门管理
export const $departmentManagementTableHeader: TableHeaderType[] = [
  {
    type: 'index',
    prop: null,
    label: '序号',
    show: true,
    fixed: false,
    fixedAlign: 'left',
    width: 65,
    align: 'center'
  },
  {
    prop: 'departmentName',
    label: '部门名称',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'departmentCode',
    label: '部门编码',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  }
];

export default {};
