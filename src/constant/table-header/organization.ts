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

// 人员管理
export const $personnelManagementTableHeader: TableHeaderType[] = [
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
    prop: 'personnelAccount',
    label: '人员账号',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'personnelName',
    label: '人员名称',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'personnelCode',
    label: '人员工号',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'phone',
    label: '手机号',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'departmentName',
    label: '所属部门',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  }
];

// 权限人员管理
export const $rolePersonnelTableHeader: TableHeaderType[] = [
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
    prop: 'personnelAccount',
    label: '员工账号',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'personnelName',
    label: '人员名称',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  },
  {
    prop: 'personnelCode',
    label: '人员工号',
    fixed: false,
    show: true,
    fixedAlign: 'left'
  }
];

export default {};
