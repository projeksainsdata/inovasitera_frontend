export interface RegisterSpecification {
  role: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailSpecification {
  token: string;
}

export interface ResendEmailSpecification {
  email: string;
}

export interface ConfirmEmailSpecification {
  email: string;
  token: string;
}

export interface ForgotPasswordSpecification {
  email: string;
}

export interface ResetPasswordSpecification {
  token: string;
}

export interface LoginSpecification {
  email: string;
  password: string;
}

export interface GoogleSpecification {
  code: string;
}

export interface RefreshTokenSpecification {
  refreshToken: string;
}
