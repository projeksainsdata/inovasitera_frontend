/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AxiosService from "@/services/axios.service";
import { ResponseApi } from "@/lib/types/api.type";
import { UPLOAD_PATH } from "@/lib/constants/api.contants";
import axios from "axios";
interface PostProps<T> {
  url: string;
  data: T;
}
export const post = async <T = any, S = any>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.post(props.url, props.data);
  return res.data;
};

export const put = async <T = any, S = any>(
  props: PostProps<S>
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.put(props.url, props.data);
  return res.data;
};

export const del = async <T = any>(
  url: string
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.delete(url);
  return res.data;
};

export const get = async <T = any>(
  url: string
): Promise<ResponseApi<T> | null> => {
  const API = AxiosService.getAxiosAuth();
  const res = await API.get(url);
  return res.data;
};

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

export const UploadImage = async ({
  file,
}: UploadImageProps): Promise<UploadImageResult> => {
  const API = AxiosService.getAxiosAuth();
  try {
    // Step 1: Request an upload token
    const { data: tokenData } = await API.post<ResponseApi<{ token: string }>>(
      UPLOAD_PATH.TOKEN_UPLOAD
    );
    const token = tokenData.data && tokenData.data.token;
    if (!token) {
      return {
        success: false,
        message: "Failed to get token",
      };
    }

    // get extension from file
    const extension = file.name.split(".").pop();
    if (!extension) {
      return {
        success: false,
        message: "Failed to get extension",
      };
    }

    // Step 2: Request a pre-signed URL using the token
    const { data: urlData } = await API.post<
      ResponseApi<{
        uploadUrl: string;
        imageId: string;
      }>
    >(UPLOAD_PATH.UPLOAD, {
      fileType: extension,
      token,
    });
    const uploadUrl = urlData.data && urlData.data.uploadUrl;
    const imageId = urlData.data && urlData.data.imageId;
    // Step 3: Upload the file to S3
    if (!uploadUrl) {
      throw new Error("Upload URL is undefined");
    }
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": extension },
    });
    // Step 4: Confirm the upload
    const { data: confirmationData } = await API.post<
      ResponseApi<{
        imageId: string;
        url: string;
      }>
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
      message: "Image uploaded successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to upload image",
    };
  }
};

export const UploadImageBatch = async ({
  files,
}: {
  files: File[];
}): Promise<UploadImageResult[]> => {
  const results = await Promise.all(files.map((file) => UploadImage({ file })));
  return results;
};
