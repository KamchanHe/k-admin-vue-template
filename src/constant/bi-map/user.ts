import { BiMap } from '@/utils/bi-map';

// 用户信息
export const $userInfoMap = new BiMap([
  ['account', 'account'], // 账号
  ['icon', 'avatar'], // 头像
  ['id', 'id'], // id
  ['mobile', 'phone'], // 手机号
  ['name', 'username'], // 用户名称
  ['code', 'userCode'], //  编码
  ['authorIds', 'roles'] // 用户权限
]);

export default {};
