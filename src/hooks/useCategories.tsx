import AxiosService from '@/services/axios.service';
import { ResponseApi } from '@/lib/types/api.type';
import { useEffect, useState } from 'react';
import { CATEGORY_PREFIX } from '@/lib/constants/api.contants';
import { AxiosError } from 'axios';
import { Categories } from '@/lib/types/categories.type';

const useCategories = () => {
    const [data, setData] = useState<Categories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API = AxiosService.getAxiosAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get<ResponseApi<Categories>>(
                    `${CATEGORY_PREFIX.INDEX}`,
                );
                setData(response.data.data);
            } catch (ErrorCatch) {
                if (ErrorCatch instanceof AxiosError) {
                    setError(ErrorCatch.response?.data.message || 'An error occurred');
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

export default useCategories;
