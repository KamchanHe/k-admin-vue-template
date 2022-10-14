/**
 * @Description: 双向映射组件
 * @example:
 * const biMapData = new BiMap([['label','value'],['key','val']])
 * const biMapConversionData = BiMapConversion(apiData,biMapData)
 * biMapData.get('label') => value
 * biMapData.get('value') => label
 * @Author: KamChan
 * @Date: 2022-03-02
 * @LastEditors: KamChan
 * @LastEditTime: 2022-03-02
 */

import {
  cloneDeep as _cloneDeep,
  isArray as _isArray,
  isObject as _isObject,
  isNumber as _isNumber,
  isString as _isString,
  map as _map
} from 'lodash-es';

const privateKey = Symbol('mapStore'); // 存储属性 [{key, val},...]
const find = Symbol('find'); // 私有方法 find
const unFind = Symbol('unFind'); // 唯一变量 代表未找到

type CommonType = string | number;
type BiMapState = [CommonType, CommonType][];
type MapStoreState = { key: CommonType; val: CommonType };
type Callback = (key: CommonType, val: CommonType, _this: BiMap) => void;

export class BiMap {
  [privateKey]: MapStoreState[] = [];

  size = 0;

  [Symbol.toStringTag] = 'BiMap';

  constructor(mapArr: BiMapState) {
    this[privateKey] = [];
    mapArr.forEach((map) => {
      this.set(map[0], map[1]);
    });
  }

  set(key: CommonType, val: CommonType) {
    if (
      this.has(key) ||
      this.has(val) ||
      (typeof key === 'number' &&
        Number.isNaN(key) &&
        typeof val === 'number' &&
        Number.isNaN(val))
    ) {
      throw new Error(`已重复的键值对${key}`);
    }
    this[privateKey].push({
      key,
      val
    });
    this.size += 1;
  }

  has(keyOrV: CommonType) {
    return this[find](keyOrV) !== unFind;
  }

  [find](keyOrV: CommonType) {
    const isNAN = typeof keyOrV === 'number' ? Number.isNaN(keyOrV) : false;
    let i = 0;
    for (let index = 0; index < this[privateKey].length; index += 1) {
      const element = this[privateKey][index];
      const { key, val } = element;
      if (isNAN) {
        if (typeof key === 'number' && Number.isNaN(key)) {
          return {
            key,
            val,
            res: val,
            tar: key,
            index: i
          };
        }
        if (typeof val === 'number' && Number.isNaN(val)) {
          return {
            key,
            val,
            res: key,
            tar: val,
            index: i
          };
        }
      } else if (key === keyOrV) {
        return {
          key,
          val,
          res: val,
          tar: key,
          index: i
        };
      } else if (val === keyOrV) {
        return {
          key,
          val,
          res: key,
          tar: val,
          index: i
        };
      }
      i += 1;
    }
    return unFind;
  }

  entries() {
    const targetSize = this.size;
    const mapStore = this[privateKey];
    return function* entriesFunction() {
      for (let index = 0, size = targetSize; index < size; index += 1) {
        yield [mapStore[index].key, mapStore[index].val];
      }
    };
  }

  keys() {
    return this[privateKey].map((e: MapStoreState) => e.key);
  }

  values() {
    return this[privateKey].map((e: MapStoreState) => e.val);
  }

  get(keyOrV: CommonType) {
    const res = this[find](keyOrV);
    if (res === unFind) {
      return undefined;
    }
    return res.res;
  }

  forEach(callback: Callback, thisArg: this) {
    for (const { key, val } of this[privateKey]) {
      callback.call(thisArg, key, val, this);
    }
  }

  clear() {
    this[privateKey] = [];
    this.size = 0;
  }

  delete(keyOrV: CommonType) {
    const res = this[find](keyOrV);
    if (res === unFind) {
      return false;
    }
    this[privateKey].splice(res.index, 1);
    this.size -= 1;
    return true;
  }
}

export function BiMapConversion<T>(targetData: T, mapData: BiMap) {
  if (_isArray(targetData)) {
    return _map(targetData, (item) => {
      const resultItem: Record<
        number | string,
        typeof item[keyof typeof item]
      > = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const val = mapData.get(key);
          if (val) {
            resultItem[val] = _cloneDeep(item[key]);
          } else if (!resultItem[key]) {
            resultItem[key] = _cloneDeep(item[key]);
          }
        }
      }
      return resultItem;
    }) as T;
  }
  if (_isObject(targetData)) {
    const resultItem: Record<string | number, T[keyof T]> = {};
    for (const key in targetData) {
      if (Object.prototype.hasOwnProperty.call(targetData, key)) {
        const val = mapData.get(key);
        if (val) {
          resultItem[val] = _cloneDeep(targetData[key]);
        } else if (!resultItem[key]) {
          resultItem[key] = _cloneDeep(targetData[key]);
        }
      }
    }
    return resultItem as T;
  }
  let key;
  if (_isNumber(targetData)) {
    key = Number(targetData);
  } else if (_isString(targetData)) {
    key = String(targetData);
  } else {
    key = '';
  }
  const val = mapData.get(key);
  return (val || targetData) as T;
}
