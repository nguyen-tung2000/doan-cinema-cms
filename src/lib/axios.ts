import { createStandaloneToast } from '@chakra-ui/toast';
import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  if (config.url?.includes('provinces')) {
    delete config.headers.authorization;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    const toast = createStandaloneToast();
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      position: 'top-right',
    });

    // Promise.reject(error);
    return Promise.reject(error);
  },
);
