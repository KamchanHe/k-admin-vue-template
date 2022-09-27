export const localGet = <T>(name: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(name) || '');
  } catch (error) {
    return null;
  }
};

export const localSet = <T>(name: string, val: T) => {
  localStorage.setItem(name, JSON.stringify(val));
};

export const localRemove = (name: string) => {
  localStorage.removeItem(name);
};

export const localClear = () => {
  localStorage.clear();
};

export const sessionGet = <T>(name: string): T | null => {
  try {
    return JSON.parse(sessionStorage.getItem(name) || '');
  } catch (error) {
    return null;
  }
};

export const sessionSet = <T>(name: string, val: T) => {
  sessionStorage.setItem(name, JSON.stringify(val));
};

export const sessionRemove = (name: string) => {
  sessionStorage.removeItem(name);
};

export const sessionClear = () => {
  sessionStorage.clear();
};

export default {
  localGet,
  localSet,
  localRemove,
  sessionGet,
  sessionSet,
  sessionRemove
};
