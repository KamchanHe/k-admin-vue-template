import { BiMap } from '@/utils/bi-map';

// 部门信息
export const $selectDepartmentItemMap = new BiMap([
  ['name', 'departmentName'],
  ['code', 'departmentCode']
]);

// 人员信息
export const $selectPersonnelItemMap = new BiMap([
  ['name', 'personnelName'],
  ['code', 'personnelCode']
]);

export default {};
