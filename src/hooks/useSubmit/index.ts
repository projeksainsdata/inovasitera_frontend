/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import AxiosService from "@/services/axios.service";
import { ResponseApi } from "@/lib/types/api.type";
import { UPLOAD_PATH } from "@/lib/constants/api.contants";

interface PostProps<T> {
  url: string;
  data: T;
}

// POST
export const post = async <T = any, S = any>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.post(props.url, props.data);
  return res.data;
};

// PUT (perbaikan)
export const put = async <T = any, S = any>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.put(props.url, props.data);
  return res.data;
};

// DELETE
export const del = async <T = any>(
  url: string
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.delete(url);
  return res.data;
};

// GET
export const get = async <T = any>(
  url: string
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.get(url);
  return res.data;
};

// === Upload ===

interface UploadImageProps {
  file: File;
  onProgress?: (progress: number) => void;
}

interface UploadImageResult {
  success: boolean;
  imageId?: string;
  url?: string;
  message: string;
}

// Upload tunggal
export const UploadImage = async ({
  file,
}: UploadImageProps): Promise<UploadImageResult> => {
  const API = AxiosService.getAxiosAuth();

  try {
    // Step 1: Request token
    const { data: tokenData } = await API.post<ResponseApi<{ token: string }>>(
      UPLOAD_PATH.TOKEN_UPLOAD
    );
    const token = tokenData.data?.token;
    if (!token) throw new Error("Gagal mendapatkan token");

    // Step 2: Request upload URL
    const extension = file.name.split(".").pop();
    if (!extension) throw new Error("Ekstensi file tidak ditemukan");

    const { data: urlData } = await API.post<
      ResponseApi<{ uploadUrl: string; imageId: string }>
    >(UPLOAD_PATH.UPLOAD, {
      fileType: extension,
      token,
    });

    const uploadUrl = urlData.data?.uploadUrl;
    const imageId = urlData.data?.imageId;
    if (!uploadUrl || !imageId) throw new Error("URL upload tidak tersedia");

    // Step 3: Upload file ke S3
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": extension },
    });

    // Step 4: Confirm upload
    const { data: confirmationData } = await API.post<
      ResponseApi<{ imageId: string; url: string }>
    >(UPLOAD_PATH.COMFIRM, {
      imageId,
      metadata: {
        filename: file.name,
        contentType: extension,
        size: file.size,
      },
    });

    return {
      success: true,
      imageId: confirmationData.data.imageId,
      url: confirmationData.data.url,
      message: "Berhasil upload gambar",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Gagal upload gambar",
    };
  }
};

// Upload banyak file
export const UploadImageBatch = async ({
  files,
}: {
  files: File[];
}): Promise<UploadImageResult[]> => {
  return await Promise.all(files.map((file) => UploadImage({ file })));
};
