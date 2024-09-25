import AxiosService from '@/services/axios.service';
import { ResponseApi } from '@/lib/types/api.type';
import { ANALYTICS_PATH } from '@/lib/constants/api.contants';
import type { DashboardData } from '@/lib/types/models.type';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

export const useAnalyticDashboard = (): {
  data: ResponseApi<DashboardData> | null;
  loading: boolean;
  error: any;
} => {
  const API = AxiosService.getAxiosAuth();
  const [data, setData] = useState<ResponseApi<DashboardData> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(ANALYTICS_PATH.DASHBOARD);
        setData(res.data);
      } catch (ErrorCatch) {
        if (ErrorCatch instanceof AxiosError) {
          setError(ErrorCatch.response?.data.message);
          return;
        }
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  return { data, loading, error };
};
