import { defineStore } from 'pinia';
import type { UserStoreType } from '@/types/store/user';
import type { UserInfoResponse } from '@/types/api/user';
import { getInfo, login, logout } from '@/api/user';
import {
  getToken as authGetToken,
  removeToken as authRemoveToken,
  setToken as authSetToken
} from '@/utils/auth';
import { resetRouter } from '@/router';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserStoreType => ({
    token: authGetToken(),
    nickname: '',
    avatar: '',
    roles: []
  }),
  actions: {
    resetState() {
      this.$reset();
    },
    /**
     * 登录
     */
    login(loginData: { username: string; password: string }) {
      const { username, password } = loginData;
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password
        })
          .then((res) => {
            const { token } = res.data;
            authSetToken(token);
            this.token = token;
            return resolve(token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo(): Promise<UserInfoResponse> {
      return new Promise((resolve, reject) => {
        getInfo({
          token: this.token
        })
          .then((res) => {
            const { data } = res;
            const { nickname, avatar } = data || {};
            let { roles } = data;
            if (!roles || roles.length <= 0) {
              roles = ['public'];
              data.roles = ['public'];
            }
            this.nickname = nickname;
            this.avatar = avatar;
            this.roles = roles;
            return resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            authRemoveToken();
            this.resetState();
            resetRouter();
            return resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        authRemoveToken();
        this.resetState();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
