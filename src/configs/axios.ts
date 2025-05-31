import axios from 'axios';

import { getAccessToken } from '@services/jwt';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

api.interceptors.request.use(async (config) => {
  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    Promise.reject(error);
  }

  return config;
});
