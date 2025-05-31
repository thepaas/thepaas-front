import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';

export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 7, // 7 days
  });
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
