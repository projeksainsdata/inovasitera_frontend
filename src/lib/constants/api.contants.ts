export const API_URL = import.meta.env.VITE_API_URL;

export const UPLOAD_PATH = {
  TOKEN_UPLOAD: "/api/v1/uploads/token",
  UPLOAD: "/api/v1/uploads/request-url",
  COMFIRM: "/api/v1/uploads/confirm",
  DELETE: "/api/v1/uploads",
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
  ADMIN: "/api/v1/inovations/admin",
  CREATE: "/api/v1/inovations",
  EDIT: "/api/v1/inovations",
  DELETE: "/api/v1/inovations",
  USER: "/api/v1/inovations/user",
};
export const RATINGS_PREFIX = {
  INDEX: "/api/v1/ratings",
  CREATE: "/api/v1/ratings",
  DELETE: "/api/v1/ratings",
};

export const WHITELIST_PREFIX = {
  INDEX: "/api/v1/whitelists/user",
  CREATE: "/api/v1/whitelists/",
  DELETE: "/api/v1/whitelists/",
};
export const USER_PREFIX = {
  INDEX: "/api/v1/users",
  CREATE: "/api/v1/users",
  EDIT: "/api/v1/users",
  DELETE: "/api/v1/users",
};

export const DASHBOARD_PREFIX = {
  USER: "/api/v1/dashboard/user",
  INNOVATION: "/api/v1/dashboard/innovation",
};
