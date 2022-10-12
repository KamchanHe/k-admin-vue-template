/**
 * @Description: 函数携带自动开启关闭loading的方法
 * @example:
 * this.$withLoading(api)(params).then(res=>{}).catch(err=>{})
 * @Author: KamChan
 * @Date: 2022-08-05
 * @LastEditors: KamChan
 * @LastEditTime: 2022-08-05
 */
import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';
import type { ResultType } from '@/types/axios';

interface LoadingOptions {
  lock?: boolean;
  text?: string;
  background?: string;
  target?: string;
  body?: boolean;
  fullscreen?: boolean;
  spinner?: string;
  customClass?: string;
}

const defaultOptions: LoadingOptions = {
  lock: true,
  text: '加载中...',
  background: 'rgba(0, 0, 0, 0.1)'
};
/**
 * 传入一个方法fn,在它执行周期内,加上全屏loading
 * 如果：
 * 1. fn是同步方法，结束后隐藏loading
 * 2. 如果是异步方法，resolve后隐藏loading
 * 3. 报错后隐藏loading并抛出错误
 * @param {function} fn 函数
 * @param options
 * @returns Function 一个新的函数，去执行它吧
 */
type FnType<Q, S> = (...args: Q[]) => Promise<ResultType<S>>;
export const withLoading = <Q, S>(
  fn: FnType<Q, S>,
  paramOptions: LoadingOptions = {}
) => {
  let loading: LoadingInstance;
  const showLoading = (options: LoadingOptions) => {
    loading = ElLoading.service(options);
  };
  const hideLoading = () => {
    if (loading) {
      loading.close();
    }
  };
  const targetOptions = { ...defaultOptions, ...paramOptions };
  const result: FnType<Q, S> = (...args) => {
    try {
      showLoading(targetOptions);
      const targetResult = fn(...args);
      const isPromise = targetResult instanceof Promise;
      if (isPromise) {
        return targetResult.then((res) => {
          hideLoading();
          return res;
        });
      }
      hideLoading();
      return new Promise((resolve) => {
        resolve(targetResult);
      });
    } catch (err) {
      hideLoading();
      throw err;
    }
  };
  return result;
};

export default {};
