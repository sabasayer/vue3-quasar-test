export const setSessionStorage = <T extends object>(key: string, user: T) => {
  sessionStorage.setItem(key, JSON.stringify(user));
};

export const getFromSessionStorage = <T extends object>(key: string) => {
  const value = sessionStorage.getItem(key);
  if (value != null) return JSON.parse(value) as T;
};
