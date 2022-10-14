import type { MockMethodType } from '@/types/mock';
import type { TokensType, UsersType } from '@/types/mock/user';

const tokens: TokensType = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
};

const users: UsersType = {
  'admin-token': {
    id: '1',
    account: 'admin',
    authorIds: ['admin'],
    icon: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    code: '001',
    mobile: '13300000000'
  },
  'editor-token': {
    id: '2',
    account: 'editor',
    authorIds: ['editor'],
    icon: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    code: '002',
    mobile: '18900000000'
  }
};

const login: MockMethodType = {
  url: '/k-admin-template/portal/login',
  method: 'post',
  response: (config) => {
    const { username } = config.body;
    const token = tokens[username];
    if (!token) {
      return {
        code: 500,
        message: 'Account and password are incorrect.'
      };
    }

    return {
      code: 200,
      data: token
    };
  }
};

const getUserInfo: MockMethodType = {
  url: '/k-admin-template/sys/user/info',
  method: 'get',
  response: (config) => {
    const { token } = config.query;
    const info = users[token];
    if (!info) {
      return {
        code: 401,
        message: 'Login failed, unable to get user details.'
      };
    }

    return {
      code: 200,
      data: info
    };
  }
};

const logout = {
  url: '/k-admin-template/portal/logout',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: 'success'
    };
  }
};

export default [login, getUserInfo, logout];
