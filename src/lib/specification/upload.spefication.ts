export interface UploadTokenSpecification {
  // fileType, maxSizeBytes
  fileType: string;
  maxSizeBytes: number;
}

export interface UploadTokenResponse {
    token: string;
    url: string;
}

export interface UploadSpecification {
  file: File;
}

export interface UploadResponse {
  // fileName, fileUrl, filePath
  fileName: string;
  fileUrl: string;
  filePath: string;
}
