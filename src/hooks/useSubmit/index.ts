"use client";
import AxiosService from "@/services/axios.service";
import { ResponseApi } from "@/lib/types/api.type";
import { UPLOAD_PATH } from "@/lib/constants/api.contants";
import { UploadResponse } from "@/lib/specification/upload.spefication";
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

export const UploadImage = async (
  file: File
): Promise<ResponseApi<UploadResponse>> => {
  const axiosApiInstance = AxiosService.getAxiosAuth();
  //  get token

  const responseToken = await axiosApiInstance.post(UPLOAD_PATH.TOKEN_UPLOAD, {
    fileType: file.type,
    maxSizeBytes: file.size,
  });

  if (!responseToken.data) {
    throw new Error("Failed to get token");
  }

  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosApiInstance.post(
    responseToken.data.data.url,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
