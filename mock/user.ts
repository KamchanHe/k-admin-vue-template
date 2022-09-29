import type { MockMethodType, ResponseConfigType } from '@/types/mock';
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
    roles: ['admin'],
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: 'Normal Editor'
  }
};

const login: MockMethodType = {
  url: '/k-admin-template/user/login',
  method: 'post',
  response: (config: ResponseConfigType) => {
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
  url: '/k-admin-template/user/info',
  method: 'get',
  response: (config: ResponseConfigType) => {
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
  url: '/k-admin-template/user/logout',
  method: 'post',
  response: () => {
    return {
      code: 200,
      data: 'success'
    };
  }
};

export default [login, getUserInfo, logout] as MockMethodType[];
