export interface ResponseApi<T> {
  url: string;
  requestId: string;
  requestTime: string;
  data: T | any | null;
  pagination?: {
    total: number;
    perPage: number;
    page: number;
  } | null;
}

export interface ResponseError {
  status: number;
  requestId: string;
  requestTime: string;
  message: string;
}
