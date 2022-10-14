import { BiMap } from '@/utils/bi-map';

// tenant
export const $tenantItemMap = new BiMap([
  ['id', 'id'],
  ['name', 'name']
]);

// 部门信息
export const $departmentItemMap = new BiMap([
  ['name', 'departmentName'],
  ['code', 'departmentCode']
]);

// 人员信息
export const $personnelItemMap = new BiMap([
  ['account', 'personnelAccount'],
  ['name', 'personnelName'],
  ['code', 'personnelCode'],
  ['mobile', 'phone'],
  ['deptId', 'departmentId'],
  ['deptInfo', 'departmentInfo']
]);

// 角色数据映射
export const $roleItemMap = new BiMap([
  ['id', 'id'], // 角色ID
  ['enable', 'enable'], // 是否启用
  ['isDefault', 'isDefault'], // 是否系统默认角色
  ['name', 'roleName'], // 角色名
  ['menuList', 'menuSelection'] // 菜单权限数据
]);

// 角色账号列表页表头映射
export const $rolePersonnelItemMap = new BiMap([
  ['account', 'personnelAccount'], // 人员账号
  ['code', 'personnelCode'], // 人员工号
  ['name', 'personnelName'] // 人员名称
]);

// 角色权限
export const $rolePermissionItemMap = new BiMap([
  ['id', 'id'], // id
  ['children', 'children'], // 子级
  ['name', 'permissionName'], // 权限名称
  ['pid', 'parentId']
]);

export default {};
