import { useEffect, useState, useCallback } from 'react';
import AxiosService from '@/services/axios.service';
import { AxiosResponse } from 'axios';
import type { ResponseError } from '@/lib/types/api.type';

interface DataFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  updateParams: (newParams: Record<string, any>) => void;
  refetch: () => void;
  params?: Record<string, any>;
}

function useDataFetch<T>(
  url: string,
  initialParams: Record<string, any> = {},
): DataFetchResult<T> {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState(initialParams);

  const axios = AxiosService.getAxiosAuth();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {
        params: params,
      });
      if (response.status === 204) {
        setData({} as T);
        return;
      }
      setData(response.data);
    } catch (catchError) {
      if (catchError instanceof Error) {
        setError(catchError);
      } else {
        const response = catchError as AxiosResponse<ResponseError>;
        setError(new Error(response.data.message));
      }
    } finally {
      setLoading(false);
    }
  }, [axios, url, params]);

  useEffect(() => {
    fetchData();
  }, [url, params, fetchData]);

  const updateParams = useCallback((newParams: Record<string, any>) => {
    // check if params is contains empty string or null delete it
    setParams(() => {
      const newParamsCopy = { ...newParams };
      Object.keys(newParamsCopy).forEach((key) => {
        if (newParamsCopy[key] === '' || newParamsCopy[key] === null) {
          delete newParamsCopy[key];
        }
      });
      return { ...newParamsCopy };
    });
  }, []);

  return { data, params, loading, error, updateParams, refetch: fetchData };
}

export default useDataFetch;
