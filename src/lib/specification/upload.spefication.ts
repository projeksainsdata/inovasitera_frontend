export interface UploadTokenSpecification {
  // fileType, maxSizeBytes
  fileType: string;
  maxSizeBytes: number;
}

export interface UploadTokenResponse {
  token: string;
}

export interface ConfirmUploadSpecification {
  // imageId, metadata
  imageId: string;
  metadata: Record<string, unknown>;
}

export interface RequestUrlSpecification {
  // fileType, token
  fileType: string;
  token: string;
}

export interface RequestUrlResponse {
  uploadUrl: string;
  imageId: string;
}

export interface UploadSpecification {
  // file, uploadUrl
  file: File;
  uploadUrl: string;
}

export interface UploadProgress {
  // percentCompleted
  percentCompleted: number;
}

export interface UploadResponse {
  // imageUrl
  imageUrl: string;
}
