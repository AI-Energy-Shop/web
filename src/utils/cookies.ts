export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  console.log(value);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};
