export const API_URL = import.meta.env.VITE_API_URL;

export const UPLOAD_PATH = {
  UPLOAD: "/api/upload",
  UPLOAD_IMAGE: "/api/upload/images",
  UPLOAD_FILE: "/api/upload/files",
};

export const AUTH_PATH = {
  LOGIN: "api/v1/login",
  REGISTER: "api/v1/register",
  REFRESH_TOKEN: "api/v1/refresh-token",
  FORGOT_PASSWORD: "api/v1/forgot-password",
  RESET_PASSWORD: "api/v1/reset-password",
  VERIFY_EMAIL: "api/v1/verify-email",
  RESEND_EMAIl: "api/v1/resend-email",
  CONFIRM_EMAIL: "api/v1/confirm-email",
  LOGOUT: "api/v1/logout",
  ME: "api/v1/me",
  GOOGLE: "api/v1/google",
};

export const CATEGORY_PREFIX = {
  INDEX: "/api/v1/categories",
  CREATE: "/api/v1/categories/",
  EDIT: "/api/v1/categories/",
  DELETE: "/api/v1/categories/",
};

export const INNOVATION_PREFIX = {
  INDEX: "/api/v1/inovations",
  CREATE: "/api/v1/inovations",
  EDIT: "/api/v1/inovations",
  DELETE: "/api/v1/inovations",
};
