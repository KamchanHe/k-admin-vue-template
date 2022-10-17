import type { TableHeaderType } from '@/types/constant/table-header';
// 选择部门
export const $selectDepartmentTableHeader: TableHeaderType[] = [
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

// 选择人员
export const $selectPersonnelTableHeader: TableHeaderType[] = [
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
