/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ResponseApi } from "@/lib/types/api.type";
import type { Token } from "@/lib/types/auth.type";
import TokenService from "./token.service";
import { API_URL, AUTH_PATH } from "@/lib/constants/api.contants";

export interface AxiosServiceInterface {
  getAxiosInstance(): AxiosInstance;
  getAxiosWithoutHeader(): AxiosInstance;
  rotateAccessToken(): Promise<boolean>;
}

export class AxiosService implements AxiosServiceInterface {
  private static instance: AxiosService;
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (value?: AxiosResponse<any>) => void;
    reject: (reason?: any) => void;
  }> = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 10000, // Reduced timeout for better user experience
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }
  getAxiosWithoutHeader(): AxiosInstance {
    throw new Error("Method not implemented.");
  }

  /** Initializes the request interceptor to attach the access token to headers. */
  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await TokenService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /** Initializes the response interceptor to handle token refresh logic. */
  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
          error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise<AxiosResponse>((resolve, reject) => {
              this.failedQueue.push({
                resolve: (value?: AxiosResponse<any>) => resolve(value ?? Promise.reject(new Error("Undefined AxiosResponse"))),
                reject,
              });
            })
              .then(() => this.axiosInstance(originalRequest))
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshed = await this.rotateAccessToken();
            if (!refreshed) {
              return Promise.reject(error);
            }
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers.Authorization = `Bearer ${await TokenService.getAccessToken()}`;
            this.processQueue(null);
            return this.axiosInstance(originalRequest);
          } catch (err) {
            this.processQueue(err);
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Processes the queue of failed requests.
   * @param error The error encountered during token refresh.
   */
  private processQueue(error: any) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.failedQueue = [];
  }

  /**
   * Refreshes the access token using the refresh token.
   * @returns A promise that resolves to true if the token was refreshed successfully.
   */
  public async rotateAccessToken(): Promise<boolean> {
    try {
      const refreshToken = await TokenService.getRefreshToken();
      if (!refreshToken) {
        TokenService.removeUser();
        TokenService.removeToken();
        return false;
      }

      const response = await axios.post(
        `${API_URL}${AUTH_PATH.REFRESH_TOKEN}`,
        {
          refreshToken,
        }
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
  }

  /** Returns the singleton instance of AxiosService. */
  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService();
    }
    return AxiosService.instance;
  }

  /** Returns the Axios instance with authentication headers. */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /** Returns a new Axios instance without authentication headers. */
  public static getAxiosWithoutHeader(): AxiosInstance {
    return axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getAxiosAuth(): AxiosInstance {
    return AxiosService.getInstance().getAxiosInstance();
  }

  /**
   * Sets a default header for all requests.
   * @param key The header name.
   * @param value The header value.
   */
  public setHeader(key: string, value: string) {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  /**
   * Removes a default header.
   * @param key The header name.
   */
  public removeHeader(key: string) {
    delete this.axiosInstance.defaults.headers.common[key];
  }
}

export default AxiosService;
