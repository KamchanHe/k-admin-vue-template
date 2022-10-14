import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store';
import type { ResultType } from '@/types/axios';

class Service {
  instance: AxiosInstance;

  baseConfig: AxiosRequestConfig = {
    baseURL: window.config.baseUrl,
    timeout: 1000 * 30
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      if (!request.headers) {
        throw new Error(
          'Expected "request" and "request.headers" not to be undefined'
        );
      }
      const token: string = getToken();
      if (token) {
        request.headers.Authorization = token;
      }
      return request;
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data;
        const kRes = {
          ...res,
          code: res.code || res.status,
          message: res.message || res.msg
        };
        if (kRes.code !== 200) {
          ElMessage.error(kRes.message || 'Error');
          if (kRes.code === 401) {
            // to re-login
            ElMessageBox.confirm(
              'You have been logged out, you can cancel to stay on this page, or log in again',
              'Confirm logout',
              {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }
            )
              .then(async () => {
                const userStore = useUserStore();
                await userStore.logout();
                window.location.reload();
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
          return Promise.reject(new Error(kRes.message || 'Error'));
        }
        return kRes;
      },
      (error) => {
        const { message, msg } = error.response.data;
        ElMessage({
          message: message || msg || '系统出错',
          type: 'error'
        });
        return Promise.reject(new Error(message || msg || 'Error'));
      }
    );
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  /**
   * config.paramsSerializer = {
   *   encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
   * }
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' }) ==> config.paramsSerializer.indexes = true // 'a[0]=b&a[1]=c'
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' }) ==> config.paramsSerializer.indexes = false// 'a[]=b&a[]=c' // **Default**
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }) ==> config.paramsSerializer.indexes = null// 'a=b&a=c'
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' }) ==> **not supported** // 'a=b,c'
   */
  public get<Q, S>(
    url: string,
    params?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.get(url, {
      params,
      paramsSerializer: {
        indexes: null
      },
      ...extraConfig
    });
  }

  public post<Q, S>(
    url: string,
    data?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.post(url, {
      ...data,
      ...extraConfig
    });
  }

  public put<Q, S>(
    url: string,
    data?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.put(url, {
      ...data,
      ...extraConfig
    });
  }

  public delete<Q, S>(
    url: string,
    params?: Q,
    extraConfig?: AxiosRequestConfig
  ): Promise<ResultType<S>> {
    return this.instance.delete(url, {
      params,
      ...extraConfig
    });
  }
}

export default new Service();
