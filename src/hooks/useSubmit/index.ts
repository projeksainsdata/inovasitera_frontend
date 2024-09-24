'use client';
import AxiosService from '@/services/axios.service';
import { ResponseApi } from '@/lib/types/api.type';
import { UPLOAD_PATH } from '@/lib/constants/api.contants';

interface PostProps {
  url: string;
  data: {
    [key: string]: any;
  };
}

export const post = async <T>(
  props: PostProps,
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  try {
    const res = await API.post(props.url, props.data);
    return res.data;
  } catch (err) {
    // check if axios error
    throw err;
  }
};

export const put = async <T>(
  props: PostProps,
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  try {
    const res = await API.put(props.url, props.data);
    return res.data;
  } catch (err) {
    // check if axios error
    throw err;
  }
};

export const del = async <T>(url: string): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  try {
    const res = await API.delete(url);
    return res.data;
  } catch (err) {
    // check if axios error
    throw err;
  }
};

export const get = async <T>(url: string): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  try {
    const res = await API.get(url);
    return res.data;
  } catch (err) {
    // check if axios error
    throw err;
  }
};

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}

export const UploadImage = async (
  file: File,
): Promise<ResponseApi<UploadedFile[]>> => {
  const axiosApiInstance = AxiosService.getAxiosAuth();
  try {
    const formData = new FormData();
    formData.append('images', file);
    const response = await axiosApiInstance.post(
      UPLOAD_PATH.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    // check if axios error
    throw error;
  }
};
