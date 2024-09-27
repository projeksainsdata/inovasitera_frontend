"use client";
import AxiosService from "@/services/axios.service";
import { ResponseApi } from "@/lib/types/api.type";
import { UPLOAD_PATH } from "@/lib/constants/api.contants";

interface PostProps<T> {
  url: string;
  data: T;
}

export const post = async <T, S>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.post(props.url, props.data);
  return res.data;
};

export const put = async <T, S>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.put(props.url, props.data);
  return res.data;
};

export const del = async <T>(url: string): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.delete(url);
  return res.data;
};

export const get = async <T>(url: string): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.get(url);
  return res.data;
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
  file: File
): Promise<ResponseApi<UploadedFile[]>> => {
  const axiosApiInstance = AxiosService.getAxiosAuth();
  const formData = new FormData();
  formData.append("images", file);
  const response = await axiosApiInstance.post(
    UPLOAD_PATH.UPLOAD_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
