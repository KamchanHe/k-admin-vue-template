const config = {
  prefix: 'k-admin_0.0.1'
};

const addPrefix = (key: string) => {
  const prefix = config.prefix ? `${config.prefix}_` : '';
  return prefix + key;
};

export const localGet = <T>(name: string): T | null => {
  const key = addPrefix(name);
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (error) {
    return null;
  }
};

export const localSet = <T>(name: string, val: T) => {
  const key = addPrefix(name);
  localStorage.setItem(key, JSON.stringify(val));
};

export const localRemove = (name: string) => {
  const key = addPrefix(name);
  localStorage.removeItem(key);
};

export const localClear = () => {
  localStorage.clear();
};

export const sessionGet = <T>(name: string): T | null => {
  const key = addPrefix(name);
  try {
    return JSON.parse(sessionStorage.getItem(key) || '');
  } catch (error) {
    return null;
  }
};

export const sessionSet = <T>(name: string, val: T) => {
  const key = addPrefix(name);
  sessionStorage.setItem(key, JSON.stringify(val));
};

export const sessionRemove = (name: string) => {
  const key = addPrefix(name);
  sessionStorage.removeItem(key);
};

export const sessionClear = () => {
  sessionStorage.clear();
};

export default {
  localGet,
  localSet,
  localRemove,
  localClear,
  sessionGet,
  sessionSet,
  sessionRemove,
  sessionClear
};
