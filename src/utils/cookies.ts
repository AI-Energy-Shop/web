export const setCookie = (name: string, value: string, days?: number) => {
  // const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const expireDays = days ? days : 12 * 60 * 60 * 1000;
  const expirationDays = new Date(Date.now() + expireDays).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDays}; path=/`;
};

export const getCookie = (name: string) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
};
