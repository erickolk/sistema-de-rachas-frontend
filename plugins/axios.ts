import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl as string;
  
  const api: AxiosInstance = axios.create({
    baseURL: 'https://15.228.16.62:3003',
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === 'ERR_NETWORK') {
        console.error('[ERROR] Erro de conexão com a API:', error);
      }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", api);
});