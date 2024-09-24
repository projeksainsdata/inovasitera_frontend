import type { AxiosInstance } from 'axios';
import axios from 'axios';

import type { ResponseApi } from '@/lib/types/api.type';

import TokenService from './token.service';
import { Token } from '@/lib/types/auth.type';
import { API_URL, AUTH_PATH } from '@/lib/constants/api.contants';

export class AxiosService {
  private static instance: AxiosService;

  private axiosInstance: AxiosInstance;

  private rotateAccessToken = async (): Promise<boolean> => {
    try {
      const refreshToken = await TokenService.getRefreshToken();
      if (!refreshToken) {
        return false;
      }
      const response = await AxiosService.getAxiosWithoutHeader().post(
        `${AUTH_PATH.REFRESH}`,
        {
          refreshToken: refreshToken,
        },
      );
      const data = response.data as ResponseApi<Token>;
      const token = data.data;
      await TokenService.updateToken(token);

      return true;
    } catch (error) {
      TokenService.removeUser();
      TokenService.removeToken();
      return false;
    }
  };

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await TokenService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const isRefreshed = await this.rotateAccessToken();
            if (!isRefreshed) {
              return Promise.reject(error);
            }
            this.setHeader(
              'Authorization',
              `Bearer ${TokenService.getAccessToken()}`,
            );
            return this.axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public static getAxiosAuth(): AxiosInstance {
    return AxiosService.getInstance().getAxiosInstance();
  }

  public setHeader(key: string, value: string) {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string) {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService();
    }

    return AxiosService.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public static getAxiosWithoutHeader(): AxiosInstance {
    return axios.create({
      baseURL: API_URL,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export interface AxiosServiceInterface {
  getAxiosInstance(): AxiosInstance;
  getAxiosWithoutHeader(): AxiosInstance;
  rotateAccessToken(): Promise<boolean>;
}

export default AxiosService;
